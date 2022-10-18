Here we will use the term “inference” as it is typically intended in the literature on probabilistic graphical models, not the same in machine learning literature.

optimal inference

| symbol                                                                                                                              | concept                                    |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| $t$                                                                                                                                 | correct value                              |
| $\hat{t}$                                                                                                                           | estimate value                             |
| $\ell(t, \hat{t})$                                                                                                                  | loss function                              |
| $\ell_{q}(t,\hat{t})=\vert{t-\hat{t}}\vert^{q}$                                                                                     | $\ell_{q}$ loss                            |
| $L_{p}(\hat{t})=\mathrm{E}_{(\mathrm{x}, \mathrm{t}) \sim p_{\mathrm{xt}}}[\ell(\mathrm{t}, \hat{t}(\mathrm{x}))]$                  | generalization risk or generalization loss |
| $\hat{t}^{*}(x)=\arg \min _{\hat{t}} \mathrm{E}_{\mathrm{t} \sim p_{\mathrm{t} \mid \mathrm{x}}}[\ell(\mathrm{t}, \hat{t}) \mid x]$ | optimal prediction or decision rule        |
| $p(x, t)$                                                                                                                           | the joint distribution                     |
| $p(t \mid x)$                                                                                                                       | posterior                                  |
| $\ell_2$                                                                                                                            | quadartic loss function                    |
| $\ell_0$                                                                                                                            | 0-1 loss function                          |
|                                                                                                                                     |                                            |

The notation $L_p$ emphasizes the dependence of the generalization loss on the distribution $p(x, t)$.

[[law of iterated expectations]]

once the posterior $p(t|x)$ is known, one can evaluate the [[optimal prediction]] for any desired loss function, without the need to know the joint distribution $p(x, t)$.

optimal estimate:

| $\ell_2$ | $\hat{t}^{*}(x)=\mathrm{E}_{\mathrm{t} \sim p_{\mathrm{t} \mid \mathrm{x}}}[\mathrm{t} \mid x]$ |
| -------- | ----------------------------------------------------------------------------------------------- |
| $\ell_0$ | $\hat{t}^{*}(x)=\arg \max _{t} p(t \mid x)$                                                     |




