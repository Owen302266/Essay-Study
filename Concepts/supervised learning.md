| symbols                    | implications                                                        |
| -------------------------- | ------------------------------------------------------------------- |
| $D$                        | training set                                                        |
| $N$                        | training points                                                     |
| $x_n$                      | free variables, covariates, domain points, or explanatory variables |
| $t_n$                      | target variables, dependent variables, labels or response           |
| $x_D={(x_1, ... , x_N)}^T$ | covariates                                                          |
| $t_D={(t_1, ... , t_N)}^T$ | labels                                                                    |

Based on this data, the goal of supervised learning is to identify an algorithm to predict the label $t$ **for a new, that is, as of yet unobserved, domain point** $x$.

We assume that $x$ and $t$ are related by a function $t=f(x)$ with some properties.

[[no free lunch theorem]]

[[inductive bias]]

**a key diﬀerence between memorizing and learning**:
1. memorizing amounts to mere retrieval of a value tn corresponding to an already observed pair $(x_n, t_n) ∈ D$.
2. Learning entails the capability to predict the value $t$ for an unseen domain point $x$.
3. Learning, in other words, converts experience – in the form of $D$ – into expertise or knowledge – in the form of a predictive algorithm.

the goal of supervised learning is that of identifying a predictive algorithm that minimizes the [[generalization loss]], that is, the error in the prediction of a new label $t$ for an unobserved explanatory variable $x$. 

**How exactly to formulate this problem**, depends on one’s viewpoint on the nature of the model that is being learned. This leads to the distinction between the frequentist and the Bayesian approaches, which is central to this chapter.