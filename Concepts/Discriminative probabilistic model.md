Once the model is learned, one can directly compute the predictor (2.6) for any loss function.

（2.6）
$\hat{t}_{\mathcal{D}}(x)=\arg \min _{\hat{t}} \mathrm{E}_{\mathrm{t} \sim p_{\mathcal{D}}(t \mid x)}[\ell(\mathrm{t}, \hat{t}) \mid x]$