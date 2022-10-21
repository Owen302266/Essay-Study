| symbol                                                                                                  | concept                                 |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| $(x_n, t_n) \in D$                                                                                      | independent identically distributed rvs |
| $L_{\mathcal{D}}(\hat{t})=\frac{1}{N} \sum_{n=1}^{N} \ell\left(t_{n}, \hat{t}\left(x_{n}\right)\right)$ | the empirical risk, empirical loss                                        |
|                                                                                                         |                                         |

$\left(\mathrm{x}_{n}, \mathrm{t}_{n}\right) \underset{\text { i.i.d. }}{\sim} p(x, t), i=1, \ldots, N$

The deﬁnition of the “true” distribution $p(x, t)$ depends in practice on the way data is collected.
The $t_n$ is related to different people.


## Taxonomy of solutions
without knowing the distribution

1. Separate learning and (plug-in) inference : more flexible
$\hat{t}_{\mathcal{D}}(x)=\arg \min _{\hat{t}} \mathrm{E}_{\mathrm{t} \sim p_{\mathcal{D}}(t \mid x)}[\ell(\mathrm{t}, \hat{t}) \mid x]$
2. Direct inference via Empirical Risk Minimization (ERM)

## Discriminative vs. Generative Probabilistic Models

[[Gaussian noise]]

1. [[Discriminative probabilistic model]]
2. [[Generative probabilistic model]]

## Model Order and Model Parameters

1. [[Model order]] $M$
2. 








