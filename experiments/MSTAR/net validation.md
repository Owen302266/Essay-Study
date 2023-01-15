
# 卷积层+lstm+卷积层输出

日期：2023-01-14  时间：17:24

**训练样本：**

随机50%，训练集randomcrop， stride为80

**网络结构：**
```python
"""

conv1 + conv2 + conv3 + conv4 + lstm + conv5

"""

class CNN_BiLSTM(nn.Module):

    def __init__(self, **params):

        super(CNN_BiLSTM, self).__init__()

        self.dropout_rate = params.get('dropout_rate', 0.5)  # dropout rate, default is 0.5

        self.classes = params.get('classes', 10)  # classes, default is 10

        self.channels = params.get('channels', 1)  # channels, default is 1

        # self.batch_size = params.get('batch_size', 2)

        _w_init = params.get('w_init', lambda x: nn.init.kaiming_normal_(x, nonlinearity='relu'))  # use He Kaiming's initialization

        _b_init = params.get('b_init', lambda x: nn.init.constant_(x, 0.1))  # initialize the bias with a constant 0.1

  

  

        self._layer = nn.Sequential(

            # layer1: input image size 88 * 88 * 1, output image size 42 * 42 * 16

            _blocks.Conv2DBlock(

                shape=[5, 5, self.channels, 16], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer2: input image size 42 * 42 * 16, output image size 19 * 19 * 32

            _blocks.Conv2DBlock(

                shape=[5, 5, 16, 32], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer3: input image size 19 * 19 * 32, output image size 7 * 7 * 64

            _blocks.Conv2DBlock(

                shape=[6, 6, 32, 64], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer4: input image size 7 * 7 * 64, output image size 3 * 3 * 128

            _blocks.Conv2DBlock(

                shape=[5, 5, 64, 128], stride=1, padding='valid', activation='relu',

                w_init=_w_init, b_init=_b_init

            ),

            nn.Flatten(start_dim=2, end_dim=-1),

            # nn.Linear(256, 10),

            # nn.Flatten(),

        )

        # self.fc = nn.Linear(256, 10)

        self.fc = _blocks.Conv2DBlock(

                shape=[8, 8, 128, self.classes], stride=1, padding='valid',

                w_init=_w_init, b_init=nn.init.zeros_

            )

  

        self.dropout = nn.Dropout(p=self.dropout_rate)

  

        self.lstm = nn.LSTM(input_size=3*3, hidden_size=32, num_layers=1, batch_first=True, bidirectional=True)

  
  

    def forward(self, x):

        x = self._layer(x)

        x = x.permute((1, 0, 2))

        outputs, (h, c) = self.lstm(x)

        outputs = outputs.permute((1, 0, 2))

        input = outputs.shape[0]

        out = outputs.reshape(input, 128, 8, 8)

        self.dropout(x)

        out = self.fc(out)

        output = out.reshape(input, self.classes)

        # outputs = outputs[0]

        # model = self.fc(outputs)

        # model = torch.sum(model, dim=1) / 20

        return output

  
def main():

    a = torch.rand([2, 1, 88, 88])

    print(a.shape)

    net = CNN_BiLSTM()

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    net.to(device)

    outputs, b, c = net(a.to(device))

    print(outputs.shape)

    print(b.shape)

    print(c.shape)
```

**配置文件：**![[config-net1.json]]

**训练结果：**![[history-net1.json]]
大概70%准确率

**细节处理：**

AconvNet的前四层+单层lstm+卷积层输出结果

# 卷积+lstm+全连接层输出

日期：2023-01-15  时间：17:10

**训练样本：**

随机50%， centorcrop

**网络结构：**
```python
'''

    conv1 + conv2 + conv3 + conv4 + lstm + fc

'''

class CNN_BiLSTM(nn.Module):

    def __init__(self, **params):

        super(CNN_BiLSTM, self).__init__()

        self.dropout_rate = params.get('dropout_rate', 0.5)  # dropout rate, default is 0.5

        self.classes = params.get('classes', 10)  # classes, default is 10

        self.channels = params.get('channels', 1)  # channels, default is 1

        # self.batch_size = params.get('batch_size', 2)

        _w_init = params.get('w_init', lambda x: nn.init.kaiming_normal_(x, nonlinearity='relu'))  # use He Kaiming's initialization

        _b_init = params.get('b_init', lambda x: nn.init.constant_(x, 0.1))  # initialize the bias with a constant 0.1

  

  

        self._layer = nn.Sequential(

            # layer1: input image size 88 * 88 * 1, output image size 42 * 42 * 16

            _blocks.Conv2DBlock(

                shape=[5, 5, self.channels, 16], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer2: input image size 42 * 42 * 16, output image size 19 * 19 * 32

            _blocks.Conv2DBlock(

                shape=[5, 5, 16, 32], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer3: input image size 19 * 19 * 32, output image size 7 * 7 * 64

            _blocks.Conv2DBlock(

                shape=[6, 6, 32, 64], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer4: input image size 7 * 7 * 64, output image size 3 * 3 * 128

            _blocks.Conv2DBlock(

                shape=[5, 5, 64, 128], stride=1, padding='valid', activation='relu',

                w_init=_w_init, b_init=_b_init

            ),

            nn.Flatten(start_dim=2, end_dim=-1),

        )

        self.fc = nn.Linear(64, 10)

        # self.fc2 = F.softmax(dim=1)

  

        self.dropout = nn.Dropout(p=self.dropout_rate)

  

        self.lstm = nn.LSTM(input_size=3*3, hidden_size=32, num_layers=1, batch_first=False, bidirectional=True)

  

        self.features = nn.Sequential(

            nn.Linear(128 * 64, 4096),

            nn.ReLU(inplace=True),

            nn.Dropout(p=self.dropout_rate),

            nn.Linear(4096, self.classes),

        )

  
  

    def forward(self, x):

        x = self._layer(x)

        x = x.permute((1, 0, 2))

  

        outputs, (h, c) = self.lstm(x)

        outputs = self.dropout(outputs)

        outputs =outputs.permute((1, 0, 2))

        outputs = outputs.reshape(outputs.shape[0], outputs.shape[1] * outputs.shape[2])

        outputs = self.features(outputs)

        return outputs

  

def main():

    a = torch.rand([2, 1, 88, 88])

    print(a.shape)

    net = CNN_BiLSTM()

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    net.to(device)

    # m = net(a.to(device))

    outputs = net(a.to(device))

    print(outputs.shape)

    print(outputs)
```

**配置文件：**![[config-net2.json]]
**训练结果：**![[history-net2.json]]
最高80%准确率

**细节处理：**

AconvNet的前四层+单层lstm+全连接层输出结果

# # 卷积层+lstm+卷积层输出

日期：2023-01-15  时间：19:08

**训练样本：**

随机50%， centorcrop

**网络结构：**
```python
"""

conv1 + conv2 + conv3 + conv4 + lstm + conv5

"""

  

class CNN_BiLSTM(nn.Module):

    def __init__(self, **params):

        super(CNN_BiLSTM, self).__init__()

        # dropout rate, default is 0.5

        self.dropout_rate = params.get('dropout_rate', 0.5)

        self.classes = params.get('classes', 10)  # classes, default is 10

        self.channels = params.get('channels', 1)  # channels, default is 1

        # self.batch_size = params.get('batch_size', 2)

        _w_init = params.get('w_init', lambda x: nn.init.kaiming_normal_(

            x, nonlinearity='relu'))  # use He Kaiming's initialization

        _b_init = params.get('b_init', lambda x: nn.init.constant_(

            x, 0.1))  # initialize the bias with a constant 0.1

        self._layer = nn.Sequential(

            # layer1: input image size 88 * 88 * 1, output image size 42 * 42 * 16

            _blocks.Conv2DBlock(

                shape=[5, 5, self.channels, 16], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer2: input image size 42 * 42 * 16, output image size 19 * 19 * 32

            _blocks.Conv2DBlock(

                shape=[5, 5, 16, 32], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer3: input image size 19 * 19 * 32, output image size 7 * 7 * 64

            _blocks.Conv2DBlock(

                shape=[6, 6, 32, 64], stride=1, padding='valid', activation='relu', max_pool=True,

                w_init=_w_init, b_init=_b_init

            ),

            # layer4: input image size 7 * 7 * 64, output image size 3 * 3 * 128

            _blocks.Conv2DBlock(

                shape=[5, 5, 64, 128], stride=1, padding='valid', activation='relu',

                w_init=_w_init, b_init=_b_init

            ),

            nn.Flatten(start_dim=2, end_dim=-1),

            # nn.Linear(256, 10),

            # nn.Flatten(),

        )

        # self.fc = nn.Linear(256, 10)

        self.fc = _blocks.Conv2DBlock(

            shape=[8, 8, 128, self.classes], stride=1, padding='valid',

            w_init=_w_init, b_init=nn.init.zeros_

        )

        self.dropout = nn.Dropout(p=self.dropout_rate)

        self.lstm = nn.LSTM(input_size=3*3, hidden_size=32,

                            num_layers=1, batch_first=True, bidirectional=True)

  

    def forward(self, x):

        x = self._layer(x)

        x = x.permute((1, 0, 2))

        outputs, (h, c) = self.lstm(x)

        outputs = outputs.permute((1, 0, 2))

        input = outputs.shape[0]

        out = outputs.reshape(input, 128, 8, 8)

        self.dropout(x)

        out = self.fc(out)

        output = out.reshape(input, self.classes)

        # outputs = outputs[0]

        # model = self.fc(outputs)

        # model = torch.sum(model, dim=1) / 20

        return output


def main():

    a = torch.rand([2, 1, 88, 88])

    print(a.shape)

    net = CNN_BiLSTM()

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    net.to(device)

    outputs, b, c = net(a.to(device))

    print(outputs.shape)

    print(b.shape)

    print(c.shape)
```

**配置文件：**![[config-net3.json]]
**训练结果：**![[history-net3.json]]
最高87.55%准确度

**细节处理：**

AconvNet的前四层+单层lstm+卷积层输出结果