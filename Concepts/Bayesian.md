# Bayesian Approach
**bayesian viewpoints:**
1. all data points are jointly distributed according to a distribution that is known except for some hyperparameters
2. the model parameters θ are jointly distributed with the data

so we assume that the joint distribution is known in Bayesian model

**ML&MAP vs Bayesian:**

hyperparameters need to be selected

MAP : same variance for all values of x
Bayesian : 
	1. uneven distribution of x
	2. Values of x closer to the existing points in the training sets generally exhibit a smaller variance.
ML:
connections:
	N enough, $w_{M A P} \rightarrow w_{M L}$

[[Marginal Likelihood]]

In Bayesian, increasing M may yield a smaller marginal likelihood.

In ML, MAP, a larger M implies a more “spread-out” prior distribution of the weights, which may result in a more diﬀuse distribution of the labels

[[alpha parameter]] 

[[empirical Bayesian]]

[[Minimum Description Length]] *(MDL)*










