Here we will use the term “inference” as it is typically intended in the literature on probabilistic graphical models, not the same in machine learning literature.

optimal inference

| symbol                                                                                                             | concept                                    |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| $t$                                                                                                                | correct value                              |
| $\hat{t}$                                                                                                          | estimate value                             |
| $\ell(t, \hat{t})$                                                                                                 | loss function                              |
| $\ell_{q}(t,\hat{t})=\vert{t-\hat{t}}\vert^{q}$                                                                    | $\ell_{q}$ loss                            |
| $L_{p}(\hat{t})=\mathrm{E}_{(\mathrm{x}, \mathrm{t}) \sim p_{\mathrm{xt}}}[\ell(\mathrm{t}, \hat{t}(\mathrm{x}))]$ | generalization risk or generalization loss |
|                                                                                                                    |                                            |




