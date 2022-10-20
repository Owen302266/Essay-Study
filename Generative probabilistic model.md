Once the joint distribution $p(x, t|θ)$ is learned from the data, one can compute the posterior $p(t|x, θ)$ using Bayes’ theorem, and, from it, the optimal predictor (2.6) can be evaluated for any loss function.
（2.6）
$\hat{t}_{\mathcal{D}}(x)=\arg \min _{\hat{t}} \mathrm{E}_{\mathrm{t} \sim p_{\mathcal{D}}(t \mid x)}[\ell(\mathrm{t}, \hat{t}) \mid x]$


As a result, an improper selection of the model may lead to more signiﬁcant bias issues. 

However,  there are potential advantages, such as the ability to deal with missing data or latent variables, such as in semi-supervised learning.