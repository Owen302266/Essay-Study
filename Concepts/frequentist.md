| symbol             | concept                                 |
| ------------------ | --------------------------------------- |
| $(x_n, t_n) \in D$ | independent identically distributed rvs |
|                    |                                         |
|                    |                                         |

$\left(\mathrm{x}_{n}, \mathrm{t}_{n}\right) \underset{\text { i.i.d. }}{\sim} p(x, t), i=1, \ldots, N$

The deﬁnition of the “true” distribution $p(x, t)$ depends in practice on the way data is collected.
The $t_n$ is related to different people.


## Taxonomy of solutions
without knowing the distribution

1. Separate learning and (plug-in) inference
$\hat{t}_{\mathcal{D}}(x)=\arg \min _{\hat{t}} \mathrm{E}_{\mathrm{t} \sim p_{\mathcal{D}}(t \mid x)}[\ell(\mathrm{t}, \hat{t}) \mid x]$
2. Direct inference via Empirical Risk Minimization (ERM)