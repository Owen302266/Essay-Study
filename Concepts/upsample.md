**上采样原理：**
图像放大几乎都是采用内插值方法,即在原有图像像素的基础上在像素点之间采用合适的插值算法插入新的元素

上采样的过程类似于一个卷积的过程,只不过在卷积之前将输入特征值插到一个更大的特征图然后进行卷积,

**在神经网络中,扩大特征图的方法,即upsample/上采样的方法：**
1)unpooling,恢复MAX的位置,其余部分补0
2)deconvolution(反卷积):先对input补零,再conv
3)插值方法,双线性插值等

**PyTorch实现：**
```python
torch.nn.UpsamplingBilinear2d(size=None,scale_factor=None)
#使用方法
class UnetUp_2(nn.Module):
    def __init__(self):
        self.up=nn.UpsamplingBilinear2d(scale_factor=(2,2))
    def forward(self, input):
        output=self.up(input)
        return output
```
-   对输入特征图进行上采样，
-   参数
    -   size - 输出尺寸,可以自己指定比如（512，418）
    -   scale_factor - 空间尺寸放大倍数
    -   **备注**：size和scale_factor两个参数不能同时指定，只能指定一个
