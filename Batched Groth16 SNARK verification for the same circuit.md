# Batched Groth16 SNARK verification for the same circuit

Short explainer of how SNARK for transaction aggregation can be verified more efficiently on-chain. It allows the trade-off "100 mil constraints + one SNARK verification <=> few proofs of 10 mil constraints + batched verification". 

Here additional transaction data size is neglected for cost estimation purposes

In our specific case where all SNARKs in the batch are effectively the same (same verifying key) the structure of the verifier is the following:

**Original equation**

```
e(proof.A, proof.B)*e(-vk.alpha, vk.beta)*e(-vk_x, vk.gamma)*e(-proof.C, vk.delta) == 1
```

where `alpha` and `beta` from are from the original Groth16 `GT = e(alpha, beta)` and nothing more than a special form to allow on-chain verification where `GT` operations are not allowed. Ethereum pairing function implicitly verifies the equation above and takes gas per each `e(...)` operation.

Structure of `vk_x` is an aggregation of public inputs in a form

```
vk_x = vkABC[0] + sum(vkABC[i]*input[i])
```

where `vkABC` is a part of verifying key that's used for inclusion of public inputs into equation.

In such naive setting verification of `N` SNARKs requires `4*N` pairing operations and `N*num_pub_inputs` scalar multiplications on-chain. Cost of point additions can be neglected, so final gas cost is roughly

```
100 000 + 80 000 * 4 * N + 40 000 * N * num_pub_inputs =
100 000 + (320 000 + 40 000 * num_pub_inputs) * N

```

**Batching**

For batching purposes one can raise every of `N` equations like on above to some random power `r[i]` (where `r[0] = 1` can be used as in degenerate case of batch of one), multiply all of them together and restructure.

Important points to remember when restructuring:

- `e(a*x, y)*e(b*x, y) = e((a+b)*x, y)`
- `e(x, y)*e(z, y) = e(x + z, y)`
- all `vkABC` are common, so accumulation for the public inputs can be further exploited

```
r[0] = 1 in this example

e(vkABC[0] + sum(vkABC[i]*input[i]), vk.gamma)*
e(r*(vkABC[0] + sum(vkABC[i]*input'[i])), vk.gamma) =
		e((1+r)*vkABC[0] + sum(vkABC[i]*(input[i] + r * input'[i]), vk.gamma)
```

- part in a form `e(proof.A, proof.B)` can not be exploited much due to different `proof.A` and `proof.B` elements in each proof (with unknown discrete logs), so here one has to pay additional scalar multiplication cost and keep elements in a form of 
 
```
e(proof.A[0],proof.B[0])*e(r[1]*proof.A[1], proof.B[1])*....
```

Inclusion of such pairing is legitimate because one can restructure everything backwards and recombine, so each equation in an orignal form above will be present with a coefficient `r[i]` in front of each G1 element in pairing

As a result each proof verification requires one pairing due to `e(proof.A,proof.B)` form plus three pairings per full batch in forms of

```
e(-sum(r[i])*vk.alpha, vk.beta) // 1 scalar multiplication

e(-vk_x_aggregated, vk.gamma) // num_pub_inputs + 1 scalar multiplications

e(-sum(r[i]*proof.C[i]), vk.delta) // N scalar multiplications
```

where additional trick for accumulation in public inputs inclusion allows to postpone scalar multiplication as much as possible and do only `num_pub_inputs + 1` scalar multiplications.

Final cost is 

```
100 000 + 80 000 * 3 + 80 000 * N + 40 000 * (num_pub_inputs + 1 + 1 + 2 * N) =
420 000 + 160 000 * N + 40 000 * num_pub_inputs
```

For our case of three public inputs (old state, new state, transactions commitment):

- Naive verification ```100 000 + 460 000 * N```
- Batch verification ```540 000 + 160 000 * N```

Carefull usage of `r[0] = 1` will also bring costs down.

## Implementation results

These tests are for **two** public inputs (should be roughly 40 000 gas less than estimations above) and uses `r[0] = 1` optimization.

- Verification of single proof using non-batching verifier requires gas: 601248

- Verification of a single proof using batching verifier requires gas: 691585

- Verification of two proofs using batching verifier requires gas: 879079

- Verification of three proofs using batching verifier requires gas: 1066574

## Author

Alex Vlasov, [@shamatar](https://github.com/shamatar),  alex.m.vlasov@gmail.com

## WIP implementation

Link is coming!