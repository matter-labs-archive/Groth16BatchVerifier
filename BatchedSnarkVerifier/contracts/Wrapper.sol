pragma solidity 0.4.25;

import "./BatchVerifier.sol";
import "./Verifier.sol";

contract Wrapper {
    constructor() public {

    }

    function verifyBatch(
        uint256[14] in_vk, // verifying key is always constant number of elements
        uint256[] vk_gammaABC, // variable length, depends on number of inputs
        uint256[] in_proof, // proof itself, length is 8 * num_proofs
        uint256[] proof_inputs, // public inputs, length is num_inputs * num_proofs
        uint256 num_proofs
    ) 
    public
    view
    returns (bool success) {
        return BatchVerifier.BatchVerify(in_vk, vk_gammaABC, in_proof, proof_inputs, num_proofs);
    }

    function verify(
        uint256[14] in_vk, // verifying key is always constant number of elements
        uint256[] vk_gammaABC, // variable length, depends on number of inputs
        uint256[8] in_proof, // proof itself, length is 8 * num_proofs
        uint256[] proof_inputs // public inputs, length is num_inputs * num_proofs
    ) 
    public 
    view 
    returns (bool success) {
        return Verifier.Verify(in_vk, vk_gammaABC, in_proof, proof_inputs);
    }

    function verifyInPower(
        uint256[14] in_vk, // verifying key is always constant number of elements
        uint256[] vk_gammaABC, // variable length, depends on number of inputs
        uint256[8] in_proof, // proof itself, length is 8 * num_proofs
        uint256[] proof_inputs // public inputs, length is num_inputs * num_proofs
    ) 
    public 
    view 
    returns (bool success) {
        return Verifier.VerifyInPower(in_vk, vk_gammaABC, in_proof, proof_inputs);
    }
}