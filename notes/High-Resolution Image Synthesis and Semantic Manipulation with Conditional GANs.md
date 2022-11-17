 High-Resolution Image Synthesis and Semantic Manipulation with Conditional GANs
日期：2022-11-10  时间：15:01

**解决的问题：**

1. 用CGAN合成分辨率为2048\*1024的高分辨率且纹理逼真的图像。

**方法：**

1. 作者训练一个生成器网络E去找图片中每个实例对应的低维特征，E是一个encoder-decoder标准结构网络。
2. 作者添加了instance-wise 平均池化层来保证每个实例的特征是一致的。
3. 添加了用G（s,E(x)）代替了GAN损失函数中的G（s），并且E与生成器，判别器一起训练。
4. 在训练后，在训练图片上运行所有实例并获得特征。在这些特征上对每个语义类别运行K-mean集群（应该是用k-mean集群的方法对特征进行归类，但是K-mean需要提前知道要多少个集群数目K。）
5. [[Perceptual Losses for Real-Time Style Transfer and Super-Resolution]]

**优势：**

1. 通过low-dimension feature channel 作为生成器的输入来实现实例级的目标修改

**特点：**

1. 该网络的生成器是多个组成：全局生成G1，两个增强网络G2



