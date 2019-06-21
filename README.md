# Batched Groth16 SNARK verification for the same circuit

Short explainer of how SNARK for transaction aggregation can be verified more efficiently on-chain. It allows the trade-off "100 mil constraints + one SNARK verification <=> few proofs of 10 mil constraints + batched verification". 

Full construction description is [here](./BatchedGroth16.md). 

## Implementation results

These tests are for **three** public inputs and uses `r[0] = 1` optimization.

- Verification of 1 proof using batching verifier requires gas: 737684
- Verification of 2 proofs using batching verifier requires gas: 924385
- Verification of 3 proofs using batching verifier requires gas: 1111151
- Verification of 4 proofs using batching verifier requires gas: 1297855
- Verification of 5 proofs using batching verifier requires gas: 1484433

## License

Implementation code available under the Apache License 2.0 license. See the [LICENSE](https://github.com/matterinc/Groth16BatchVerifier/LICENSE.md) for details.

## Author

Alex Vlasov, [@shamatar](https://github.com/shamatar),  alex.m.vlasov@gmail.com
