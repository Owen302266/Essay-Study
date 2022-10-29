**steps:**
1. select $N$ data points uniformly with replacement from $D$ -> same data will repeat

2. train the model $K$ times

3. average the results using equal weights

**disadvantages:**

the bootstrap data sets are all drawn from $D$ and hence the estimation errors are not independent, obtaining smaller gains, particularly for large $K$.

