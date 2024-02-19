[PennyPot.xyz]() is an automatable savings protocol where users can opt-in tokens for diverse strategies, manage upkeeps, and remit round-down savings. PPot integrates Particle Network Auth for seamless wallet creation, Covalent's Goldrushkit & API for token insights, and Chainlink Functions for frontend and backend automation.

## Pennypot Client:

| Particle Network Integration                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Particle Network Auth enables users to sign in and create smart account abstraction wallets on PennyPot using email and social logins. |
| 2. Embed Particle's wallet, with toggling visibility based on user choice.                                                                |
| 3. Batching Transaction; grouping ERC20 token spending cap approval for a savings pot and the opt-in function on PennyPot.                |

| Covalent's Goldrushkit and Unified API                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- |
| 1. Covalent's Goldrushkit provides token balance and transfer history for users.                                                  |
| 2. Covalent's Unified API is used to retrieve users' tokens and listed as whitelisting options when creating a new savings quest. |

| Chainlink Functions SDK                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chainlink Fuctions SDK enables up to perform off-chain request computations, uploading secrets and then delivering the request as bytes-string for the user to submit to the automation contract, alongside an opt-in call. |
