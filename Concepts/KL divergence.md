KL散度是两个分布之间对数似然比 (LLR) $ln(p(x)/q(x))$ 的期望

$\mathrm{KL}(p \| q)=\mathrm{E}_{\mathrm{x} \sim p_{\mathrm{x}}}\left[\ln \frac{p(\mathrm{x})}{q(\mathrm{x})}\right]$

在$p(x)=\mathcal{N}\left(x \mid \mu_{1}, \sigma_{1}^{2}\right)$和$q(x)=\mathcal{N}\left(x \mid \mu_{2}, \sigma_{2}^{2}\right)$的情况下:
$\mathrm{KL}(p \| q)=\frac{1}{2}\left(\frac{\sigma_{1}^{2}}{\sigma_{2}^{2}}+\frac{\left(\mu_{2}-\mu_{1}\right)^{2}}{\sigma_{2}^{2}}-1+\ln \frac{\sigma_{2}^{2}}{\sigma_{1}^{2}}\right)$
when :$\sigma_{1}^{2}=\sigma_{2}^{2}=\sigma^{2}$, $\mathrm{KL}(p \| q)=\frac{1}{2} \frac{\left(\mu_{2}-\mu_{1}\right)^{2}}{\sigma^{2}}$

[[Gibbs’ inequality]]

$\mathrm{KL}(p \| q)=\underbrace{\mathrm{E}_{\mathrm{x} \sim p_{\mathrm{x}}}[-\ln q(\mathrm{x})]}_{H(p \| q)}-\underbrace{\mathrm{E}_{\mathrm{x} \sim p_{\mathrm{x}}}[-\ln p(\mathrm{x})]}_{H(p)}$

1. $H(p||q)$ is [[cross-entropy]] between $p(x)$ and $q(x)$
2. $H(p)$ is entropy of $p(x)$



