const Wrapper = artifacts.require('Wrapper');
const BatchVerifierContract = artifacts.require("BatchVerifierContract")

contract('Batch verifier with three inputs', async (accounts) => {
    const BN = require("bn.js");


    const P = new BN("21888242871839275222246405745257275088696311157297823662689037894645226208583")


    const account = accounts[0];
    let wrapper;
    let verifier;
    
    beforeEach(async () => {
        wrapper = await Wrapper.new({from: account})
        verifier = await BatchVerifierContract.new({from: account})
        verifier = wrapper
    })

    // const VK_STATIC = {'alpha': [
    //     '12098363977103623815216202600362270495937328872995677641537524168797655554221', 
    //     '2219793121300352984120106073217648080178945999838451700995699039259562912982'], 
    // 'beta': [['21394932423069570210815241418167892200127260386382006986845470829593191378517', 
    //         '11794081736311478782527407160451365293732946520115905057244856768136659762759'], 
    //         ['9852393727029189760586093228993832247112291436582635997425065862795690046959', 
    //         '12721567411845341398748067172608383733714415807572351458952162526545349064712']], 
    // 'gamma': [['20423720887278116677104027340421974996982691326268583647524616585255451097037', 
    //         '18510564607701768874385758804835079216678904374474581012831970593133982925981'], 
    //         ['495006553648706205063502289879388088897951656566004376728990831574488256947', 
    //         '2255322659970049182097852724204633929286909130618017020079010464150812741258']], 
    // 'delta': [['4134608098794546462721624443876848517497987522843782554332342014902582519546', 
    //     '18495632996017013969389244780773040964505944382827951131300014588673675023869'], 
    //     ['7028145825759496982188228906300928543547396287822491136916723521623574016226', 
    //     '3094616827268957145585789993344081108905385085705353786487984829092899412223']], 
    // 'gammaABC': [['12656056868832951507441808596237937019277511269154694665452453518746922799440', 
    //         '5715087108047569315887827873450021510290713746425263307680371986153531127065'], 
    //         ['10773926608408686536693177211618750590342802253247760952613528661329074331245', 
    //         '8576864022181764432960778901585812862145541296061317769470096729010906615742'], 
    //         ['12903849397878471478172181299505479279792662297077705261138233885784795617784', 
    //         '2043630549607971568671548073890390532422627295529622050606189366502357822035'],
    //         ['4224056514810791140996728056279905549080775755791142908335214421172243101535', 
    //         '17407222003192750153914138001953998997763102396164168661024474066913465318731']]}
    
    
    
    const VK_STATIC = {'alpha': [
        '12098363977103623815216202600362270495937328872995677641537524168797655554221', 
        '2219793121300352984120106073217648080178945999838451700995699039259562912982'], 
    'beta': [['11794081736311478782527407160451365293732946520115905057244856768136659762759', 
            '21394932423069570210815241418167892200127260386382006986845470829593191378517'], 
            ['12721567411845341398748067172608383733714415807572351458952162526545349064712', 
            '9852393727029189760586093228993832247112291436582635997425065862795690046959']], 
    'gamma': [['18510564607701768874385758804835079216678904374474581012831970593133982925981', 
            '20423720887278116677104027340421974996982691326268583647524616585255451097037'], 
            ['2255322659970049182097852724204633929286909130618017020079010464150812741258', 
            '495006553648706205063502289879388088897951656566004376728990831574488256947']], 
    'delta': [['18495632996017013969389244780773040964505944382827951131300014588673675023869', 
        '4134608098794546462721624443876848517497987522843782554332342014902582519546'], 
        ['3094616827268957145585789993344081108905385085705353786487984829092899412223', 
        '7028145825759496982188228906300928543547396287822491136916723521623574016226']], 
    'gammaABC': [['12656056868832951507441808596237937019277511269154694665452453518746922799440', 
            '5715087108047569315887827873450021510290713746425263307680371986153531127065'], 
            ['10773926608408686536693177211618750590342802253247760952613528661329074331245', 
            '8576864022181764432960778901585812862145541296061317769470096729010906615742'], 
            ['12903849397878471478172181299505479279792662297077705261138233885784795617784', 
            '2043630549607971568671548073890390532422627295529622050606189366502357822035'],
            ['4224056514810791140996728056279905549080775755791142908335214421172243101535', 
            '17407222003192750153914138001953998997763102396164168661024474066913465318731']]}        
    
   
    // const PROOF_STATIC = [{'A': 
    //         ['14971535961294649086645185195948674994989282480520310775767406507269889023959', 
    //         '13586903807800210473524537151984101284394638813530745925700163882516560552893'], 
    //     'B': [['14264697485948663928797123991543419762083957864899351320389945818802206835222', 
    //         '16270589272008810468507997228605046414311946687212699607975912027304616619095'], 
    //         ['8526311541313373565750000201899339735808162309593343263776235601265628720543', 
    //         '19523296705636033880269841448908302585269696528384791166911698900773074446178']], 
    //     'C': ['18640851691543499848946321990114812871692656240737473022446323657839459709485', 
    //         '15378573814147786555020612108326851809933672421226170221213720282831517066450'], 
    //     'input': ['1681692777', '1714636915', '2837290955']}]

    
    
    const PROOF_STATIC = [
        {'A': 
        ['14971535961294649086645185195948674994989282480520310775767406507269889023959', 
        '13586903807800210473524537151984101284394638813530745925700163882516560552893'], 
    'B': [['16270589272008810468507997228605046414311946687212699607975912027304616619095', 
        '14264697485948663928797123991543419762083957864899351320389945818802206835222'], 
        ['19523296705636033880269841448908302585269696528384791166911698900773074446178', 
        '8526311541313373565750000201899339735808162309593343263776235601265628720543']], 
    'C': ['18640851691543499848946321990114812871692656240737473022446323657839459709485', 
        '15378573814147786555020612108326851809933672421226170221213720282831517066450'], 
    'input': ['1681692777', '1714636915', '2837290955']},

        {'A': 
        ['9647046004336737100130703719829685180235629463096513350207475442303754363526', 
        '1296726458235589336389854690385208782046328573858533162199356700519729256863'], 
    'B': [['1383373937768279645877078295678642921487548947291998177039744864298804112974', 
        '7079899879099190214070367032345941111061307119197489021616311950384691377839'], 
        ['206350760580887926209834490007165485230788661589862266683344019794513381016', 
        '2792964768143358589920788674750174245103940888987146981920945395302968961951']], 
    'C': ['4700662730061372874166184795673028875748655073819547823655057784446938719952', 
        '14844862133467476266421172605959044559003489525753036359977473080571351482913'], 
    'input': ['1957747793', '424238335', '1822947391']},

    {'A': 
        ['5957752558779604889794400480001461944774205826176217882305740982549142456887', 
        '13850157361942393059047376732399055541666671177804060690811978395614440481370'], 
    'B': [['10111065257371716195194022699701508187380385873771810588327701537664389048362', 
        '10629496687768239183105581906002779307345083217352316319065855742503802377013'], 
        ['18331647298962992333811196120453237782877678251289985522999766579770266098923', 
        '6155912852847551082812282812251414673427764567847174690912170897303945373049']], 
    'C': ['16592087118747649020951832383234181107008695697486612387979871086713793191316', 
        '7738503612233300708749580073819125442557127829722118482067337870717505551955'], 
    'input': ['719885386', '1649760492', '1810607141']},

    {'A': 
        ['18273915245613423136249079106799875606204069921804789533792175760944204393491', 
        '5272415066480957218969510640008298822773561811386887617211967840223559455071'], 
    'B': [['128680787806888699930059563475379961082845745280152090455297087830403298678', 
        '14236234046767203819743117060459869712648547143436060583216346782720104656655'], 
        ['16135370535363459298117400639471936595707701520158801950764933910600996310282', 
        '18658664037905668162051318218530562471648051572799213256221611371561772058006']], 
    'C': ['21534887057402145836529573464678085388450602011119671005721809494644618347186', 
        '20215050674456851957177740541057314744713209967921565647623305189464879810840'], 
    'input': ['596516649', '1189641421', '1227119333']},

    {'A': 
        ['6537583253365993014119488590331656039667724637607901812550110098923154788481', 
        '4482739641769468996143282611387309080747209681050198802370892204832052524968'], 
    'B': [['13660561494517772038386597893739670675103380862460254358241769497102903732739', 
        '19220688145526315445161090133606231118973827522280938200484706410718558963140'], 
        ['19875604773750928844432798346010337925747662774191972526196598641785663300428', 
        '6143360662381188776291027248978313225601603287080673720378882004973458099594']], 
    'C': ['9622269883564965898229291287628977177252159640766721062010204224762548508894', 
        '10707781191889687311610627050630438439639325541900717037652090849174393755083'], 
    'input': ['1025202362', '1350490027', '1816653652']}
]

    function serializeInputs(numInputs) {
        const proofs = [];
        const inputs = [];
        let limit = PROOF_STATIC.length;
        if (numInputs < limit) {
            limit = numInputs;
        }
        for (let i = 0; i < limit; i++) {
            proofs.push(new BN(PROOF_STATIC[i].A[0]));
            proofs.push(new BN(PROOF_STATIC[i].A[1]));
            proofs.push(new BN(PROOF_STATIC[i].B[0][0]));
            proofs.push(new BN(PROOF_STATIC[i].B[0][1]));
            proofs.push(new BN(PROOF_STATIC[i].B[1][0]));
            proofs.push(new BN(PROOF_STATIC[i].B[1][1]));
            proofs.push(new BN(PROOF_STATIC[i].C[0]));
            proofs.push(new BN(PROOF_STATIC[i].C[1]));

            inputs.push(new BN(PROOF_STATIC[i].input[0]));
            inputs.push(new BN(PROOF_STATIC[i].input[1]));
            inputs.push(new BN(PROOF_STATIC[i].input[2]));
        }

        return {proofs, inputs};
    }


    it('verify single proof', async () => {
        try {
            // function verify(
            //     uint256[14] in_vk, // verifying key is always constant number of elements
            //     uint256[] vk_gammaABC, // variable length, depends on number of inputs
            //     uint256[] in_proof, // proof itself, length is 8 * num_proofs
            //     uint256[] proof_inputs, // public inputs, length is num_inputs * num_proofs
            //     uint256 num_proofs
            // )
            const in_vk = [];
            in_vk.push(new BN(VK_STATIC.alpha[0]));
            in_vk.push(new BN(VK_STATIC.alpha[1]));      
            in_vk.push(new BN(VK_STATIC.beta[0][0]));
            in_vk.push(new BN(VK_STATIC.beta[0][1]));
            in_vk.push(new BN(VK_STATIC.beta[1][0]));
            in_vk.push(new BN(VK_STATIC.beta[1][1]));       
            in_vk.push(new BN(VK_STATIC.gamma[0][0]));
            in_vk.push(new BN(VK_STATIC.gamma[0][1]));
            in_vk.push(new BN(VK_STATIC.gamma[1][0]));
            in_vk.push(new BN(VK_STATIC.gamma[1][1]));
            in_vk.push(new BN(VK_STATIC.delta[0][0]));
            in_vk.push(new BN(VK_STATIC.delta[0][1]));
            in_vk.push(new BN(VK_STATIC.delta[1][0]));
            in_vk.push(new BN(VK_STATIC.delta[1][1]));

            const vk_gammaABC = [];
            for (let i = 0; i < VK_STATIC.gammaABC.length; i++) {
                let gElement = VK_STATIC.gammaABC[i];
                vk_gammaABC.push(new BN(gElement[0]));
                vk_gammaABC.push(new BN(gElement[1]));
            }

            const {proofs, inputs} = serializeInputs(1);

            const gas = await verifier.verify.estimateGas(in_vk, vk_gammaABC, proofs, inputs, {gas: 4700000});
            console.log("Verification of single proof using non-batching verifier requires gas: " + gas)

            const verificationResult = await verifier.verify(in_vk, vk_gammaABC, proofs, inputs, {gas: 4700000});
            assert(verificationResult, "SNARK single verification failed")
            // console.log(JSON.stringify(verificationResult.logs.map((el) => {
            //     return "[" + web3.utils.toHex(el.args.idx) + ", " + web3.utils.toHex(el.args.data) + "]"
            // })));
        } catch(error) {
            console.log(error);
            throw error;
        }
    })

    it('verify proofs in batches', async () => {
        try {
            // function verify(
            //     uint256[14] in_vk, // verifying key is always constant number of elements
            //     uint256[] vk_gammaABC, // variable length, depends on number of inputs
            //     uint256[] in_proof, // proof itself, length is 8 * num_proofs
            //     uint256[] proof_inputs, // public inputs, length is num_inputs * num_proofs
            //     uint256 num_proofs
            // )
            const in_vk = [];
            in_vk.push(new BN(VK_STATIC.alpha[0]));
            in_vk.push(new BN(VK_STATIC.alpha[1]));      
            in_vk.push(new BN(VK_STATIC.beta[0][0]));
            in_vk.push(new BN(VK_STATIC.beta[0][1]));
            in_vk.push(new BN(VK_STATIC.beta[1][0]));
            in_vk.push(new BN(VK_STATIC.beta[1][1]));       
            in_vk.push(new BN(VK_STATIC.gamma[0][0]));
            in_vk.push(new BN(VK_STATIC.gamma[0][1]));
            in_vk.push(new BN(VK_STATIC.gamma[1][0]));
            in_vk.push(new BN(VK_STATIC.gamma[1][1]));
            in_vk.push(new BN(VK_STATIC.delta[0][0]));
            in_vk.push(new BN(VK_STATIC.delta[0][1]));
            in_vk.push(new BN(VK_STATIC.delta[1][0]));
            in_vk.push(new BN(VK_STATIC.delta[1][1]));

            const vk_gammaABC = [];
            for (let i = 0; i < VK_STATIC.gammaABC.length; i++) {
                let gElement = VK_STATIC.gammaABC[i];
                vk_gammaABC.push(new BN(gElement[0]));
                vk_gammaABC.push(new BN(gElement[1]));
            }
            for (let num_proofs = 1; num_proofs <= PROOF_STATIC.length; num_proofs++) {
                const {proofs, inputs} = serializeInputs(num_proofs);

                const gas = await verifier.verifyBatch.estimateGas(in_vk, vk_gammaABC, proofs, inputs, num_proofs, {gas: 4700000});
                console.log("Verification of " + num_proofs + " proofs using batching verifier requires gas: " + gas)
                const verificationResult = await verifier.verifyBatch(in_vk, vk_gammaABC, proofs, inputs, num_proofs, {gas: 4700000});
                assert(verificationResult, "SNARK batch verification failed for batched verifier for " + num_proofs + " proofs")
            }
            
            // console.log(JSON.stringify(verificationResult.logs.map((el) => {
            //     return "[" + web3.utils.toHex(el.args.idx) + ", " + web3.utils.toHex(el.args.data) + "]"
            // })));
        } catch(error) {
            console.log(error);
            throw error;
        }
    })

    it('verify soundness for proofs in batches', async () => {
        try {
            // function verify(
            //     uint256[14] in_vk, // verifying key is always constant number of elements
            //     uint256[] vk_gammaABC, // variable length, depends on number of inputs
            //     uint256[] in_proof, // proof itself, length is 8 * num_proofs
            //     uint256[] proof_inputs, // public inputs, length is num_inputs * num_proofs
            //     uint256 num_proofs
            // )
            const in_vk = [];
            in_vk.push(new BN(VK_STATIC.alpha[0]));
            in_vk.push(new BN(VK_STATIC.alpha[1]));      
            in_vk.push(new BN(VK_STATIC.beta[0][0]));
            in_vk.push(new BN(VK_STATIC.beta[0][1]));
            in_vk.push(new BN(VK_STATIC.beta[1][0]));
            in_vk.push(new BN(VK_STATIC.beta[1][1]));       
            in_vk.push(new BN(VK_STATIC.gamma[0][0]));
            in_vk.push(new BN(VK_STATIC.gamma[0][1]));
            in_vk.push(new BN(VK_STATIC.gamma[1][0]));
            in_vk.push(new BN(VK_STATIC.gamma[1][1]));
            in_vk.push(new BN(VK_STATIC.delta[0][0]));
            in_vk.push(new BN(VK_STATIC.delta[0][1]));
            in_vk.push(new BN(VK_STATIC.delta[1][0]));
            in_vk.push(new BN(VK_STATIC.delta[1][1]));

            const vk_gammaABC = [];
            for (let i = 0; i < VK_STATIC.gammaABC.length; i++) {
                let gElement = VK_STATIC.gammaABC[i];
                vk_gammaABC.push(new BN(gElement[0]));
                vk_gammaABC.push(new BN(gElement[1]));
            }
            for (let num_proofs = 1; num_proofs <= PROOF_STATIC.length; num_proofs++) {
                const {proofs, inputs} = serializeInputs(num_proofs);

                // mess up with random input element

                let i = Math.floor(Math.random(inputs.length));
                inputs[i] = inputs[i].subn(1)

                const verificationResult = await verifier.verifyBatch(in_vk, vk_gammaABC, proofs, inputs, num_proofs, {gas: 4700000});
                assert(!verificationResult, "SNARK batch verification MUST have failed for batched verifier for " + num_proofs + " proofs and invalid input")
            }
        } catch(error) {
            console.log(error);
            throw error;
        }
    })
});
