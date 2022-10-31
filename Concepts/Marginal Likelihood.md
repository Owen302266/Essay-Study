在经典的（频率派）的统计学中，边缘似然这一概念产生于联合参数 $\theta=(\psi,\lambda)$，其中$\psi$是我们关心的实际参数，$\lambda$是一个不关心的冗余参数。如果$\lambda$服从概率分布，那么通常可以通过边缘化$\lambda$来考虑$\psi$的似然函数：
$\mathcal{L}(\psi ; \mathbb{X})=\mathrm{p}(\mathbb{X} \mid \psi)=\int_{\lambda} \mathrm{p}(\mathbb{X} \mid \lambda, \psi) \mathrm{p}(\lambda \mid \psi)$

https://blog.csdn.net/fjy19950504/article/details/105130728