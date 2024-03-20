"use strict";
exports.id = 166;
exports.ids = [166];
exports.modules = {

/***/ 166:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ GlobalContext),
/* harmony export */   "q": () => (/* binding */ GlobalState)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(247);
/* harmony import */ var _utils_program__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(679);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(201);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__]);
([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const GlobalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    isConnected: null,
    waLLet: null,
    hasUserAccount: null,
    allBets: null,
    fetchBets: null
});
const GlobalState = ({ children  })=>{
    const { 0: program , 1: setProgram  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: isConnected , 1: setIsConnected  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: masterAccount1 , 1: setMasterAccount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: allBets1 , 1: setAllBets  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: userBets , 1: setUserBets  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { connection  } = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__.useConnection)();
    const waLLet = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__.useAnchorWallet)();
    // Set Program
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (connection) {
            setProgram((0,_utils_program__WEBPACK_IMPORTED_MODULE_4__/* .getPrgram */ .p9)(connection, waLLet !== null && waLLet !== void 0 ? waLLet : {}));
        } else {
            setProgram(null);
        }
    }, [
        connection,
        waLLet
    ]);
    //Check wallet connection
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setIsConnected(!!(waLLet === null || waLLet === void 0 ? void 0 : waLLet.publicKey));
    }, [
        waLLet
    ]);
    const fetchMasterAccount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!program) return;
        try {
            const masterAccountPk = await (0,_utils_program__WEBPACK_IMPORTED_MODULE_4__/* .getMasterAccountPk */ .Rg)();
            const masterAccount = await program.account.master.fetch(masterAccountPk);
            setMasterAccount(masterAccount);
        } catch (e) {
            console.log("could not fetch master account: ", e.message);
            setMasterAccount(null);
        }
    });
    // check for master account
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!masterAccount1 && program) {
            fetchMasterAccount();
        }
    }, [
        masterAccount1,
        program
    ]);
    const fetchBets = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!program) return;
        const allBetsResult = await program.account.bet.all();
        const allBets = allBetsResult.map((bet)=>bet.account
        );
        setAllBets(allBets);
    }, [
        program
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // fetch all bets if allbets doesn't exist.
        if (!allBets1) {
            fetchBets();
        }
    }, [
        allBets1,
        fetchBets
    ]);
    // const createBet = useCallback(
    //     async(amount, price, duration, pythPrice) => {
    //         if(!masterAccount) return;
    //         try{
    //             const betId = masterAccount.lastBetId.addn(1);
    //             const res = await getBetAccountPk(betId);
    //             console.log({betPk: res});
    //             const txHash = await program.methods
    //             .createBet(amount, price, duration, pythPrice)
    //             .accounts({
    //                 bet: await getBetAccountPk(betId),
    //                 master: await getMasterAccountPk(),
    //                 player: waLLet.publicKey,
    //             })
    //             .rpc()
    //             await connection.confirmTransaction(txHash);
    //             console.log("Created bet!", txHash);
    //             toast.success("Created bet!")
    //         } catch(e) {
    //             toast.error("Failed to create bet!");
    //             console.log("Failed to create bet!",e.message);
    //         }
    //     },
    //     [masterAccount]
    // )
    const createBet = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (amount, price, duration, pythPrice)=>{
        if (!masterAccount1 || !program) {
            console.error("Master account or program not initialized.");
            return;
        }
        try {
            const betId = masterAccount1.lastBetId.addn(1);
            const betPk = await (0,_utils_program__WEBPACK_IMPORTED_MODULE_4__/* .getBetAccountPk */ .gN)(betId);
            console.log("Creating bet with ID:", betId.toString());
            console.log("Bet Account Public Key:", betPk.toString());
            const tx = program.methods.createBet(amount, price, duration, pythPrice).accounts({
                bet: betPk,
                master: await (0,_utils_program__WEBPACK_IMPORTED_MODULE_4__/* .getMasterAccountPk */ .Rg)(),
                player: waLLet.publicKey
            });
            const txHash = await tx.rpc();
            await connection.confirmTransaction(txHash);
            console.log("Created bet with transaction hash:", txHash);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].success("Created bet!");
        } catch (e) {
            console.error("Failed to create bet:", e.message);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error("Failed to create bet!");
        }
    }, [
        masterAccount1,
        program,
        connection,
        waLLet
    ]);
    const closeBet = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (bet)=>{
        if (!masterAccount1) return;
        try {
            const txHash = await program.methods.closeBet().accounts({
                bet: await (0,_utils_program__WEBPACK_IMPORTED_MODULE_4__/* .getBetAccountPk */ .gN)(bet.id),
                player: waLLet.publicKey
            }).rpc();
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].success("Closed Bet");
        } catch (e) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error("Failed to close bet");
            console.log("Could not close bet", e.message);
        }
    }, [
        masterAccount1
    ]);
    // const enterBet = useCallback(
    //     async(price, bet) => {
    //         if(!masterAccount) return;
    //         try{
    //             const txHash = await program.methods
    //             .enterBet(price)
    //             .accounts({
    //                 bet: await getBetAccountPk(bet.id),
    //                 player: waLLet.publicKey
    //             })
    //             .rpc();
    //             toast.success("Entered Bet!");
    //         }
    //         catch(e) {
    //             console.log("Couldn't enter bet", e.message);
    //             toast.error("Failed to enter bet!");
    //         }
    //     },[masterAccount]
    // )
    const enterBet = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (price, bet)=>{
        if (!masterAccount1) return;
        try {
            const txHash = await program.methods.enterBet(price).accounts({
                bet: await (0,_utils_program__WEBPACK_IMPORTED_MODULE_4__/* .getBetAccountPk */ .gN)(bet.id),
                player: waLLet.publicKey
            }).rpc();
            console.log("Entered Bet with transaction hash:", txHash);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].success("Entered Bet!");
        } catch (e) {
            console.error("Failed to enter bet:", e);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error("Failed to enter bet!");
        }
    }, [
        masterAccount1,
        program,
        waLLet
    ]);
    const claimBet = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (bet)=>{
        if (!masterAccount1) return;
        try {
            const txHash = await program.methods.claimBet().account({
                bet: await (0,_utils_program__WEBPACK_IMPORTED_MODULE_4__/* .getBetAccountPk */ .gN)(bet.id),
                pyth: bet.pythPriceKey,
                playerA: bet.predictionA.player,
                playerB: bet.predictionB.player,
                signer: waLLet.publicKey
            }).rpc();
            console.log("Claimed Bet");
        } catch (e) {
            console.log("Couldn't claim", e.message);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error("Failed to claim");
        }
    }, [
        masterAccount1
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(GlobalContext.Provider, {
        value: {
            masterAccount: masterAccount1,
            allBets: allBets1,
            createBet,
            closeBet,
            enterBet,
            claimBet
        },
        children: children
    }));
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 76:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_e": () => (/* binding */ RPC_ENDPOINT),
/* harmony export */   "tr": () => (/* binding */ PROGRAM__ID)
/* harmony export */ });
/* unused harmony export MINIMUM_REMAINING_TIME_UNITL_EXPIRY */
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_0__);

const RPC_ENDPOINT = "https://snowy-twilight-lambo.solana-devnet.discover.quiknode.pro/06ccd13a7862a02057c149363873a4696be5444b/";
const PROGRAM__ID = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey("3vY5F41z5htZdEv3AF5vppzamEYwXFWGVatWRhZuRbBC");
const MINIMUM_REMAINING_TIME_UNITL_EXPIRY = 120;


/***/ }),

/***/ 679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p9": () => (/* binding */ getPrgram),
/* harmony export */   "Rg": () => (/* binding */ getMasterAccountPk),
/* harmony export */   "gN": () => (/* binding */ getBetAccountPk)
/* harmony export */ });
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(831);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);



// Create a ficntion that gets the solana program we created
const getPrgram = (connection, wallet)=>{
    const IDL = __webpack_require__(177);
    const provider = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.AnchorProvider(connection, wallet, _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.AnchorProvider.defaultOptions());
    const program = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.Program(IDL, _constants__WEBPACK_IMPORTED_MODULE_2__/* .PROGRAM__ID */ .tr, provider);
    return program;
};
const getProgramAccountPk = async (seeds)=>{
    return (await _solana_web3_js__WEBPACK_IMPORTED_MODULE_1__.PublicKey.findProgramAddress(seeds, _constants__WEBPACK_IMPORTED_MODULE_2__/* .PROGRAM__ID */ .tr))[0];
};
const getMasterAccountPk = async ()=>{
    return await getProgramAccountPk([
        Buffer.from("master")
    ]);
};
const getBetAccountPk = async (id)=>{
    return await getProgramAccountPk([
        Buffer.from("bet"),
        new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.BN(id).toArrayLike(Buffer, "le", 8)
    ]);
};


/***/ }),

/***/ 177:
/***/ ((module) => {

module.exports = JSON.parse('{"version":"0.1.0","name":"prediction_dapp","instructions":[{"name":"createMaster","accounts":[{"name":"master","isMut":true,"isSigner":false},{"name":"payer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"createBet","accounts":[{"name":"bet","isMut":true,"isSigner":false},{"name":"master","isMut":true,"isSigner":false},{"name":"player","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"amount","type":"u64"},{"name":"price","type":"f64"},{"name":"duration","type":"u32"},{"name":"pythPriceKey","type":"publicKey"}]},{"name":"enterBet","accounts":[{"name":"bet","isMut":true,"isSigner":false},{"name":"player","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"price","type":"f64"}]},{"name":"claimBet","accounts":[{"name":"bet","isMut":true,"isSigner":false},{"name":"pyth","isMut":false,"isSigner":false},{"name":"playerA","isMut":true,"isSigner":false},{"name":"playerB","isMut":true,"isSigner":false},{"name":"signer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"closeBet","accounts":[{"name":"bet","isMut":true,"isSigner":false},{"name":"player","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[]}],"accounts":[{"name":"Master","type":{"kind":"struct","fields":[{"name":"lastBetId","type":"u64"}]}},{"name":"Bet","type":{"kind":"struct","fields":[{"name":"id","type":"u64"},{"name":"amount","type":"u64"},{"name":"predictionA","type":{"defined":"BetPrediction"}},{"name":"predictionB","type":{"option":{"defined":"BetPrediction"}}},{"name":"state","type":{"defined":"BetState"}},{"name":"pythPriceKey","type":"publicKey"},{"name":"expiryTs","type":"i64"}]}}],"types":[{"name":"BetPrediction","type":{"kind":"struct","fields":[{"name":"player","type":"publicKey"},{"name":"price","type":"f64"}]}},{"name":"BetState","type":{"kind":"enum","variants":[{"name":"Created"},{"name":"Started"},{"name":"PlayerAWon"},{"name":"PlayerBWon"},{"name":"Draw"}]}}],"errors":[{"code":6000,"name":"CannotEnter","msg":"Cannot Enter"},{"code":6001,"name":"CannotClaim","msg":"Cannot Enter"},{"code":6002,"name":"CannotClose","msg":"Cannot Close"},{"code":6003,"name":"InvalidPythKey","msg":"Given Key for the Pyth account does not match"},{"code":6004,"name":"InvalidPythAccount","msg":"Invalid Pyth account"},{"code":6005,"name":"PriceTooBig","msg":"Price is too big to parse to u32"}]}');

/***/ })

};
;