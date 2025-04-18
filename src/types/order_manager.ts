/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/order_manager.json`.
 */
export type OrderManager = {
  "address": "EHxoxzqUShPuJbcSVFvqAVizLJxUpENTKnMBUGKSgQkc",
  "metadata": {
    "name": "orderManager",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claimAdvance",
      "discriminator": [
        225,
        108,
        86,
        138,
        99,
        172,
        89,
        142
      ],
      "accounts": [
        {
          "name": "seller",
          "signer": true,
          "relations": [
            "orderState"
          ]
        },
        {
          "name": "sellerTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "orderState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "configState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimOrder",
      "discriminator": [
        164,
        202,
        83,
        197,
        77,
        171,
        96,
        234
      ],
      "accounts": [
        {
          "name": "seller",
          "signer": true,
          "relations": [
            "orderState"
          ]
        },
        {
          "name": "sellerTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "orderState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "configState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "confirmOrder",
      "discriminator": [
        142,
        28,
        201,
        134,
        143,
        201,
        118,
        244
      ],
      "accounts": [
        {
          "name": "buyer",
          "signer": true,
          "relations": [
            "orderState"
          ]
        },
        {
          "name": "orderState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createOrder",
      "discriminator": [
        141,
        54,
        37,
        207,
        237,
        210,
        250,
        215
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "seller"
        },
        {
          "name": "orderState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "usdcMint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "paymentMode",
          "type": {
            "defined": {
              "name": "paymentMode"
            }
          }
        },
        {
          "name": "advancePercentage",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "configState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "initialAdmin",
          "type": "pubkey"
        },
        {
          "name": "initialMaxDeliveryTime",
          "type": "i64"
        },
        {
          "name": "initialMaxSignTime",
          "type": "i64"
        },
        {
          "name": "vaultAuthorityBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "payOrder",
      "discriminator": [
        52,
        142,
        74,
        106,
        147,
        51,
        53,
        17
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true,
          "relations": [
            "orderState"
          ]
        },
        {
          "name": "buyerTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "orderState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "configState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "usdcMint"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "redeemOrder",
      "discriminator": [
        16,
        54,
        3,
        160,
        206,
        95,
        53,
        189
      ],
      "accounts": [
        {
          "name": "buyer",
          "signer": true,
          "relations": [
            "orderState"
          ]
        },
        {
          "name": "buyerTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "orderState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "configState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setAdmin",
      "discriminator": [
        251,
        163,
        0,
        52,
        91,
        194,
        187,
        92
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "configState"
          ]
        },
        {
          "name": "configState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "setMaxDeliveryTime",
      "discriminator": [
        55,
        112,
        200,
        180,
        196,
        10,
        193,
        37
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "configState"
          ]
        },
        {
          "name": "configState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "timeInSeconds",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setMaxSignTime",
      "discriminator": [
        178,
        110,
        155,
        25,
        237,
        43,
        209,
        116
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "configState"
          ]
        },
        {
          "name": "configState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "timeInSeconds",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setOrderState",
      "discriminator": [
        188,
        16,
        224,
        190,
        154,
        37,
        240,
        15
      ],
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "relations": [
            "configState"
          ]
        },
        {
          "name": "orderState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "arg",
                "path": "tradeId"
              }
            ]
          }
        },
        {
          "name": "configState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "tradeId",
          "type": "u64"
        },
        {
          "name": "newStatus",
          "type": {
            "defined": {
              "name": "orderStatus"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configState",
      "discriminator": [
        193,
        77,
        160,
        128,
        208,
        254,
        180,
        135
      ]
    },
    {
      "name": "orderState",
      "discriminator": [
        60,
        123,
        67,
        162,
        96,
        43,
        173,
        225
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "zeroAmount",
      "msg": "Amount must be greater than zero."
    },
    {
      "code": 6001,
      "name": "invalidState",
      "msg": "Invalid order state for this action."
    },
    {
      "code": 6002,
      "name": "invalidStateTransition",
      "msg": "Invalid state transition."
    },
    {
      "code": 6003,
      "name": "invalidBuyer",
      "msg": "Invalid buyer for this order."
    },
    {
      "code": 6004,
      "name": "invalidSeller",
      "msg": "Invalid seller for this order."
    },
    {
      "code": 6005,
      "name": "invalidAdmin",
      "msg": "Signer is not the admin."
    },
    {
      "code": 6006,
      "name": "invalidPaymentMode",
      "msg": "Invalid payment mode for this action."
    },
    {
      "code": 6007,
      "name": "invalidAdvancePercentage",
      "msg": "Invalid advance percentage (must be 1-100 for Advance mode)."
    },
    {
      "code": 6008,
      "name": "advanceAlreadyClaimed",
      "msg": "Advance payment has already been claimed."
    },
    {
      "code": 6009,
      "name": "deliveryTimeNotExceeded",
      "msg": "Delivery time has not yet been exceeded."
    },
    {
      "code": 6010,
      "name": "signTimeNotExceeded",
      "msg": "Sign time has not yet been exceeded."
    },
    {
      "code": 6011,
      "name": "nothingToClaim",
      "msg": "Nothing to claim or redeem."
    },
    {
      "code": 6012,
      "name": "nothingToRedeem",
      "msg": "Nothing to redeem."
    },
    {
      "code": 6013,
      "name": "invalidOwner",
      "msg": "Provided token account is not owned by the expected owner."
    },
    {
      "code": 6014,
      "name": "invalidMint",
      "msg": "Provided token account's mint does not match the order/vault mint."
    },
    {
      "code": 6015,
      "name": "invalidVaultOwner",
      "msg": "Vault token account is not owned by the vault authority PDA."
    },
    {
      "code": 6016,
      "name": "invalidTargetState",
      "msg": "Invalid target state for set_order_state."
    },
    {
      "code": 6017,
      "name": "amountCalculationError",
      "msg": "Error during amount calculation."
    },
    {
      "code": 6018,
      "name": "timestampCalculationError",
      "msg": "Error during timestamp calculation."
    },
    {
      "code": 6019,
      "name": "claimConditionsNotMet",
      "msg": "Claim conditions not met (must be Confirmed or Signed+Timeout)."
    }
  ],
  "types": [
    {
      "name": "configState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "maxDeliveryTime",
            "type": "i64"
          },
          {
            "name": "maxSignTime",
            "type": "i64"
          },
          {
            "name": "vaultAuthorityBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "orderState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "seller",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "tradeId",
            "type": "u64"
          },
          {
            "name": "orderAmount",
            "type": "u64"
          },
          {
            "name": "paidAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "paymentMode",
            "type": {
              "defined": {
                "name": "paymentMode"
              }
            }
          },
          {
            "name": "advancePercentage",
            "type": "u8"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "orderStatus"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "paidAt",
            "type": "i64"
          },
          {
            "name": "shippedAt",
            "type": "i64"
          },
          {
            "name": "signedAt",
            "type": "i64"
          },
          {
            "name": "confirmedAt",
            "type": "i64"
          },
          {
            "name": "completedAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "orderStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "unpaid"
          },
          {
            "name": "paid"
          },
          {
            "name": "shipped"
          },
          {
            "name": "signed"
          },
          {
            "name": "confirmed"
          },
          {
            "name": "completed"
          },
          {
            "name": "unfulfilled"
          }
        ]
      }
    },
    {
      "name": "paymentMode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "direct"
          },
          {
            "name": "advance"
          }
        ]
      }
    }
  ]
};
