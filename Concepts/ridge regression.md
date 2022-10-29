equation 2.27:

$\min _{w} L_{\mathcal{D}}(w)+\frac{\lambda}{N}\|w\|^{2}$

solve $||w||^2$ through adding the quadratic (or Tikhonov) regularization function

[[standard LS analysis]]

$w_{M A P}=\left(\lambda I+X_{\mathcal{D}}^{T} X_{\mathcal{D}}\right)^{-1} X_{\mathcal{D}}^{T} t_{\mathcal{D}}$