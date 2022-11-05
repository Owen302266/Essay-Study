
# Notions

==|S| :represents the cardinality of a set S.==

# [[Acronyms]]

# Basic
Rather than requiring a precise model of the set-up under study, machine learning requires the speciﬁcation of an objective, of a model to be trained, and of an optimization technique.

the approach has the key disadvantages of providing generally suboptimal performance, or hindering interpretability of the solution, and to apply only to a limited set of problems.

## when to use?
1. the task involves a function that maps well-deﬁned inputs to well- deﬁned outputs;
2. large dataset
3. clear feedback and definable goals and metrics
4. no logic or reasons depend on background knowledge or common sense
5. no explanation for how to decide
6. no need for correct answer
7. train data not change rapidly
8. no need for special needs 

*focus on training and computational statistics tools*
### tasks
1. **supervised learning** : 
	classification and regression probelms
	output : deterministic predictive function
2. **Unsupervised learning** :
	clustering, dimensionality reduction, feature extraction and representation learning
**semi-supervise learning** : not all the examples are labelled
3.  **reinforce learning** :
	infer optimal sequential decisions based on rewards or punishments received as a result of previous actions
**other classify methods:**
	passive~active
	offline~online
### goals
the importance of probability

# Introduction through linear regression

We start by introducing the problem of [[supervised learning]] and by presenting [[inference background]]. We then present the [[frequentist]], [[Bayesian]] and [[MDL learning approaches]] in this order. The treatment of MDL is limited to an introductory discussion, as the rest of monograph concentrates on frequentist and Bayesian viewpoints. We conclude with an introduction to the important topic of [[information-theoretic metrics]], and with a brief introduction to the advanced topics of [[interpretation and casualty]].

# Probabilistic Models for Learning

In this chapter, we introduce a family of probabilistic models, known as the exponential family, whose members are used as components in many of the most common probabilistic models and learning algorithms. 

## Preliminaries

| name                        | translate                                                                                           |
|:--------------------------- |:--------------------------------------------------------------------------------------------------- |
| convex set                  | 凸集                                                                                                |
| convex optimization problem | 凸优化问题                                                                                          |
| gradient                    | $\nabla f(x)=\left[\partial f(x) / \partial x_{1} \cdots \partial f(x) / \partial x_{D}\right]^{T}$ |
| Hessian                     | $\nabla^{2} f(x)=\partial^{2} f(x) / \partial x_{i} \partial x_{j}$                                 |
| sufficient statistic        | $\theta=f(x)$                                                                                       |

##  The Exponential Family

We introduce the exponential family of parametric probabilistic models. It includes Gaussian, Laplace, Gamma, Beta and Dirichlet pdfs, as well as Bernoulli, Categorical, multinomial, and Poisson pmfs.

We often use unnormalized distribution, which might be easier to evaluate.

































