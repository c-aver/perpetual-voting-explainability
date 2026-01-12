import type { InstanceDayConfig, InstanceVoterConfig } from './types.ts';

export const instanceVoters: Record<string, InstanceVoterConfig[]> =
{
  "simple": [
    {
      "id": 1,
      "label": "מצביע 1"
    },
    {
      "id": 2,
      "label": "מצביע 2"
    },
    {
      "id": 3,
      "label": "מצביע 3"
    },
    {
      "id": 4,
      "label": "מצביע 4"
    },
    {
      "id": 5,
      "label": "מצביע 5"
    },
    {
      "id": 6,
      "label": "מצביע 6"
    }
  ],
  "complicated": [
    {
      "id": 1,
      "label": "מצביע 1"
    },
    {
      "id": 2,
      "label": "מצביע 2"
    },
    {
      "id": 3,
      "label": "מצביע 3"
    },
    {
      "id": 4,
      "label": "מצביע 4"
    },
    {
      "id": 5,
      "label": "מצביע 5"
    },
    {
      "id": 6,
      "label": "מצביע 6"
    }
  ],
  "few_rounds": [
    {
      "id": 1,
      "label": "מצביע 1"
    },
    {
      "id": 2,
      "label": "מצביע 2"
    },
    {
      "id": 3,
      "label": "מצביע 3"
    },
    {
      "id": 4,
      "label": "מצביע 4"
    },
    {
      "id": 5,
      "label": "מצביע 5"
    },
    {
      "id": 6,
      "label": "מצביע 6"
    }
  ],
  "constant": [
    {
      "id": 1,
      "label": "מצביע 1"
    },
    {
      "id": 2,
      "label": "מצביע 2"
    },
    {
      "id": 3,
      "label": "מצביע 3"
    },
    {
      "id": 4,
      "label": "מצביע 4"
    },
    {
      "id": 5,
      "label": "מצביע 5"
    },
    {
      "id": 6,
      "label": "מצביע 6"
    }
  ]
};

export const instanceDays: Record<string, Record<string, InstanceDayConfig[]>> =
{
  "simple": {
    "approval": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      }
    ],
    "equal_shares": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      }
    ],
    "phragmen": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      }
    ],
    "unit_cost": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      }
    ]
  },
  "complicated": {
    "approval": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      }
    ],
    "equal_shares": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      }
    ],
    "phragmen": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      }
    ],
    "unit_cost": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "D"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "D"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C",
              "D"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "D"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "A",
              "D"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      }
    ]
  },
  "few_rounds": {
    "approval": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "B",
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      }
    ],
    "equal_shares": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "B",
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      }
    ],
    "phragmen": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "B",
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      }
    ],
    "unit_cost": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A",
              "B"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A",
              "B",
              "C"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "C"
            ],
            "voterId": 6
          }
        ],
        "winner": "C"
      }
    ]
  },
  "constant": {
    "approval": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      }
    ],
    "equal_shares": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      }
    ],
    "phragmen": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      }
    ],
    "unit_cost": [
      {
        "day": 1,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 2,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 4,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 5,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "A"
      },
      {
        "day": 6,
        "votes": [
          {
            "selections": [
              "A"
            ],
            "voterId": 1
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 4
          },
          {
            "selections": [
              "A"
            ],
            "voterId": 5
          },
          {
            "selections": [
              "B"
            ],
            "voterId": 6
          }
        ],
        "winner": "B"
      }
    ]
  }
};

export const instanceBasedExplanations: Record<string, Record<string, string[]>> =
{
  "simple": {
    "approval": [
      "המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל B.",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל C.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל A.",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל C.",
      "המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל B.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל A."
    ],
    "equal_shares": [
      "המועמד B ניצח כי הקבוצה שהצביעה לו (מצביע 2, מצביע 5 ומצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 שקלים.\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 6.000 ועכשיו התעדכן ל 4.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 3 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 6.000 ועכשיו התעדכן ל 4.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 6 היה תקציב 6.000 ועכשיו התעדכן ל 4.000, מכיוון ששילם 2.000 ש\"ח.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 2, מצביע 5 ומצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 שקלים.\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 4.000 ועכשיו התעדכן ל 2.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 3 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 4.000 ועכשיו התעדכן ל 2.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 6 היה תקציב 4.000 ועכשיו התעדכן ל 2.000, מכיוון ששילם 2.000 ש\"ח.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2 ומצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 ועכשיו התעדכן ל 4.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 2 היה תקציב 2.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 3 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 2.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 2.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 2.000 ש\"ח.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 שקלים.\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 4.000 ועכשיו התעדכן ל 2.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 6.000 ועכשיו התעדכן ל 4.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 2.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1 ומצביע 4) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 4.000 שקלים.\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 2.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 4.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 ועכשיו התעדכן ל 2.000, מכיוון ששילם 4.000 ש\"ח.\nלמצביע 5 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 3, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 4.000 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 4.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 4.000 ש\"ח.\nלמצביע 4 היה תקציב 2.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 5 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר."
    ],
    "phragmen": [
      "המועמד B ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 2, מצביע 5 ומצביע 6 הצביעו ל- B, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 2.000 ק\"ג.\nאחרי שבחרנו את B זה מאזן העומסים:\nהעומס על מצביע 1 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 0.000 ועכשיו התעדכן ל 2.000, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 3 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 0.000 ועכשיו התעדכן ל 2.000, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 6 היה 0.000 ועכשיו התעדכן ל 2.000, מכיוון שלקח על עצמו 2.000 ק\"ג.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1 ומצביע 3 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 3.000 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 0.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 3.000 ק\"ג.\nהעומס על מצביע 2 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 0.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 3.000 ק\"ג.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 2.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2 ומצביע 6 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 4.333 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 3.000 ועכשיו התעדכן ל 4.333, מכיוון שלקח על עצמו 1.333 ק\"ג.\nהעומס על מצביע 2 היה 2.000 ועכשיו התעדכן ל 4.333, מכיוון שלקח על עצמו 2.333 ק\"ג.\nהעומס על מצביע 3 היה 3.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 2.000 ועכשיו התעדכן ל 4.333, מכיוון שלקח על עצמו 2.333 ק\"ג.",
      "המועמד C ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 3 ומצביע 5 הצביעו ל- C, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 5.111 ק\"ג.\nאחרי שבחרנו את C זה מאזן העומסים:\nהעומס על מצביע 1 היה 4.333 ועכשיו התעדכן ל 5.111, מכיוון שלקח על עצמו 0.778 ק\"ג.\nהעומס על מצביע 2 היה 4.333 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 3.000 ועכשיו התעדכן ל 5.111, מכיוון שלקח על עצמו 2.111 ק\"ג.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 ועכשיו התעדכן ל 5.111, מכיוון שלקח על עצמו 3.111 ק\"ג.\nהעומס על מצביע 6 היה 4.333 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1 ומצביע 4 הצביעו ל- C, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 5.556 ק\"ג.\nאחרי שבחרנו את C זה מאזן העומסים:\nהעומס על מצביע 1 היה 5.111 ועכשיו התעדכן ל 5.556, מכיוון שלקח על עצמו 0.444 ק\"ג.\nהעומס על מצביע 2 היה 4.333 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 5.111 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 ועכשיו התעדכן ל 5.556, מכיוון שלקח על עצמו 5.556 ק\"ג.\nהעומס על מצביע 5 היה 5.111 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 4.333 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 7.259 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 5.556 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 4.333 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 5.111 ועכשיו התעדכן ל 7.259, מכיוון שלקח על עצמו 2.148 ק\"ג.\nהעומס על מצביע 4 היה 5.556 ועכשיו התעדכן ל 7.259, מכיוון שלקח על עצמו 1.704 ק\"ג.\nהעומס על מצביע 5 היה 5.111 ועכשיו התעדכן ל 7.259, מכיוון שלקח על עצמו 2.148 ק\"ג.\nהעומס על מצביע 6 היה 4.333 והוא נשאר אותו הדבר."
    ],
    "unit_cost": [
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל את סכום המשקלים הגדול ביותר- 3.000.\nאחרי הבחירה ב B, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 1.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 4.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 6 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 6.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל את סכום המשקלים הגדול ביותר- 8.000.\nאחרי הבחירה ב C, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 3.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 4.000 ועכשיו התעדכן ל 5.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 3.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל את סכום המשקלים הגדול ביותר- 9.000.\nאחרי הבחירה ב B, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 3.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 5.000 ועכשיו התעדכן ל 6.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 3.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 3.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 13.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 4.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 6.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 3.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה."
    ]
  },
  "complicated": {
    "approval": [
      "המועמד D ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל D.",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n4 מצביעים הצביעו ל C.",
      "המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל B.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל A.",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל C.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל A."
    ],
    "equal_shares": [
      "המועמד D ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3, מצביע 4, מצביע 5 ומצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.200 שקלים.\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 2 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 4 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 5 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 6 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.500 שקלים.\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 4.800 ועכשיו התעדכן ל 3.300, מכיוון ששילם 1.500 ש\"ח.\nלמצביע 2 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 4.800 ועכשיו התעדכן ל 3.300, מכיוון ששילם 1.500 ש\"ח.\nלמצביע 4 היה תקציב 4.800 ועכשיו התעדכן ל 3.300, מכיוון ששילם 1.500 ש\"ח.\nלמצביע 5 היה תקציב 4.800 ועכשיו התעדכן ל 3.300, מכיוון ששילם 1.500 ש\"ח.\nלמצביע 6 היה תקציב 4.800 והוא נשאר אותו הדבר.",
      "המועמד B ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3 ומצביע 4) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 שקלים.\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 3.300 ועכשיו התעדכן ל 1.300, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 2 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 3.300 ועכשיו התעדכן ל 1.300, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 4 היה תקציב 3.300 ועכשיו התעדכן ל 1.300, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 5 היה תקציב 3.300 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 4.800 והוא נשאר אותו הדבר.",
      "המועמד D ניצח כי הקבוצה שהצביעה לו (מצביע 2 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 שקלים.\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 6.000 ועכשיו התעדכן ל 3.000, מכיוון ששילם 3.000 ש\"ח.\nלמצביע 3 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 3.300 ועכשיו התעדכן ל 0.300, מכיוון ששילם 3.000 ש\"ח.\nלמצביע 6 היה תקציב 4.800 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 2 ומצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 3.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 3.000 ש\"ח.\nלמצביע 3 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 0.300 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 4.800 ועכשיו התעדכן ל 1.800, מכיוון ששילם 3.000 ש\"ח.",
      "המועמד D נבחר למרות שאין לתומכים שלו מספיק תקציב לממן אותו, אך גם לא ניתן לממן מועמדים אחרים.\nומועמד D יכול לאסוף מהתומכים את התקציב הכי גבוה.\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.300 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.300 ש\"ח.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 0.300 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 1.800 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.800 ש\"ח."
    ],
    "phragmen": [
      "המועמד D ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 3, מצביע 4, מצביע 5 ומצביע 6 הצביעו ל- D, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 1.200 ק\"ג.\nאחרי שבחרנו את D זה מאזן העומסים:\nהעומס על מצביע 1 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 2 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 4 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 5 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 6 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.",
      "המועמד C ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- C, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 2.700 ק\"ג.\nאחרי שבחרנו את C זה מאזן העומסים:\nהעומס על מצביע 1 היה 1.200 ועכשיו התעדכן ל 2.700, מכיוון שלקח על עצמו 1.500 ק\"ג.\nהעומס על מצביע 2 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 1.200 ועכשיו התעדכן ל 2.700, מכיוון שלקח על עצמו 1.500 ק\"ג.\nהעומס על מצביע 4 היה 1.200 ועכשיו התעדכן ל 2.700, מכיוון שלקח על עצמו 1.500 ק\"ג.\nהעומס על מצביע 5 היה 1.200 ועכשיו התעדכן ל 2.700, מכיוון שלקח על עצמו 1.500 ק\"ג.\nהעומס על מצביע 6 היה 1.200 והוא נשאר אותו הדבר.",
      "המועמד D ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 2 ומצביע 6 הצביעו ל- D, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 3.600 ק\"ג.\nאחרי שבחרנו את D זה מאזן העומסים:\nהעומס על מצביע 1 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 0.000 ועכשיו התעדכן ל 3.600, מכיוון שלקח על עצמו 3.600 ק\"ג.\nהעומס על מצביע 3 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 1.200 ועכשיו התעדכן ל 3.600, מכיוון שלקח על עצמו 2.400 ק\"ג.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 4.700 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 3.600 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 2.700 ועכשיו התעדכן ל 4.700, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 4 היה 2.700 ועכשיו התעדכן ל 4.700, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 5 היה 2.700 ועכשיו התעדכן ל 4.700, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 6 היה 3.600 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 2 ומצביע 6 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 6.600 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 3.600 ועכשיו התעדכן ל 6.600, מכיוון שלקח על עצמו 3.000 ק\"ג.\nהעומס על מצביע 3 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 3.600 ועכשיו התעדכן ל 6.600, מכיוון שלקח על עצמו 3.000 ק\"ג.",
      "המועמד D ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1 ומצביע 6 הצביעו ל- D, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 7.650 ק\"ג.\nאחרי שבחרנו את D זה מאזן העומסים:\nהעומס על מצביע 1 היה 2.700 ועכשיו התעדכן ל 7.650, מכיוון שלקח על עצמו 4.950 ק\"ג.\nהעומס על מצביע 2 היה 6.600 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 6.600 ועכשיו התעדכן ל 7.650, מכיוון שלקח על עצמו 1.050 ק\"ג."
    ],
    "unit_cost": [
      "המועמד D ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, D קיבל את סכום המשקלים הגדול ביותר- 5.000.\nאחרי הבחירה ב D, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 1.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל את סכום המשקלים הגדול ביותר- 4.000.\nאחרי הבחירה ב C, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד D ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, D קיבל את סכום המשקלים הגדול ביותר- 5.000.\nאחרי הבחירה ב D, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 3.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 6.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 7.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 4.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 6 היה שווה 3.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 10.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 4.000 ועכשיו התעדכן ל 5.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 4.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 3.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 6 היה שווה 3.000 והוא נשאר אותו הדבר."
    ]
  },
  "few_rounds": {
    "approval": [
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל C.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל A.",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל C."
    ],
    "equal_shares": [
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 שקלים.\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 3.000 ועכשיו התעדכן ל 1.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 2 היה תקציב 3.000 ועכשיו התעדכן ל 1.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 3 היה תקציב 3.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 3.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 3.000 ועכשיו התעדכן ל 1.000, מכיוון ששילם 2.000 ש\"ח.\nלמצביע 6 היה תקציב 3.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 3 ומצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 שקלים.\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 1.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 3.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 3.000 ש\"ח.\nלמצביע 4 היה תקציב 3.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 1.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 3.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 3.000 ש\"ח.",
      "המועמד B ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 שקלים.\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.000 ש\"ח.\nלמצביע 2 היה תקציב 1.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.000 ש\"ח.\nלמצביע 3 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 3.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 3.000 ש\"ח.\nלמצביע 5 היה תקציב 1.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.000 ש\"ח.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר."
    ],
    "phragmen": [
      "המועמד C ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2 ומצביע 5 הצביעו ל- C, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 2.000 ק\"ג.\nאחרי שבחרנו את C זה מאזן העומסים:\nהעומס על מצביע 1 היה 0.000 ועכשיו התעדכן ל 2.000, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 2 היה 0.000 ועכשיו התעדכן ל 2.000, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 3 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 0.000 ועכשיו התעדכן ל 2.000, מכיוון שלקח על עצמו 2.000 ק\"ג.\nהעומס על מצביע 6 היה 0.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 3 ומצביע 6 הצביעו ל- C, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 3.000 ק\"ג.\nאחרי שבחרנו את C זה מאזן העומסים:\nהעומס על מצביע 1 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 0.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 3.000 ק\"ג.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 0.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 3.000 ק\"ג.",
      "המועמד B ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2, מצביע 4 ומצביע 5 הצביעו ל- B, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 3.000 ק\"ג.\nאחרי שבחרנו את B זה מאזן העומסים:\nהעומס על מצביע 1 היה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 1.000 ק\"ג.\nהעומס על מצביע 2 היה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 1.000 ק\"ג.\nהעומס על מצביע 3 היה 3.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 3.000 ק\"ג.\nהעומס על מצביע 5 היה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שלקח על עצמו 1.000 ק\"ג.\nהעומס על מצביע 6 היה 3.000 והוא נשאר אותו הדבר."
    ],
    "unit_cost": [
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל את סכום המשקלים הגדול ביותר- 3.000.\nאחרי הבחירה ב C, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל את סכום המשקלים הגדול ביותר- 4.000.\nאחרי הבחירה ב C, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל את סכום המשקלים הגדול ביותר- 10.000.\nאחרי הבחירה ב C, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 2.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר."
    ]
  },
  "constant": {
    "approval": [
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל A.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל A.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל A.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל A.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל A.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל A."
    ],
    "equal_shares": [
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.200 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 2 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 3 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 4 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 5 היה תקציב 6.000 ועכשיו התעדכן ל 4.800, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 6 היה תקציב 6.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.200 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 4.800 ועכשיו התעדכן ל 3.600, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 2 היה תקציב 4.800 ועכשיו התעדכן ל 3.600, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 3 היה תקציב 4.800 ועכשיו התעדכן ל 3.600, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 4 היה תקציב 4.800 ועכשיו התעדכן ל 3.600, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 5 היה תקציב 4.800 ועכשיו התעדכן ל 3.600, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 6 היה תקציב 6.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.200 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 3.600 ועכשיו התעדכן ל 2.400, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 2 היה תקציב 3.600 ועכשיו התעדכן ל 2.400, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 3 היה תקציב 3.600 ועכשיו התעדכן ל 2.400, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 4 היה תקציב 3.600 ועכשיו התעדכן ל 2.400, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 5 היה תקציב 3.600 ועכשיו התעדכן ל 2.400, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 6 היה תקציב 6.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.200 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 2.400 ועכשיו התעדכן ל 1.200, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 2 היה תקציב 2.400 ועכשיו התעדכן ל 1.200, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 3 היה תקציב 2.400 ועכשיו התעדכן ל 1.200, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 4 היה תקציב 2.400 ועכשיו התעדכן ל 1.200, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 5 היה תקציב 2.400 ועכשיו התעדכן ל 1.200, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 6 היה תקציב 6.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.200 שקלים.\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.200 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 2 היה תקציב 1.200 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 3 היה תקציב 1.200 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 4 היה תקציב 1.200 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 5 היה תקציב 1.200 ועכשיו התעדכן ל 0.000, מכיוון ששילם 1.200 ש\"ח.\nלמצביע 6 היה תקציב 6.000 והוא נשאר אותו הדבר.",
      "המועמד B ניצח כי הקבוצה שהצביעה לו (מצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 6.000 שקלים.\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 6.000 ועכשיו התעדכן ל 0.000, מכיוון ששילם 6.000 ש\"ח."
    ],
    "phragmen": [
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 1.200 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 2 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 3 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 4 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 5 היה 0.000 ועכשיו התעדכן ל 1.200, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 6 היה 0.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 2.400 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 1.200 ועכשיו התעדכן ל 2.400, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 2 היה 1.200 ועכשיו התעדכן ל 2.400, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 3 היה 1.200 ועכשיו התעדכן ל 2.400, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 4 היה 1.200 ועכשיו התעדכן ל 2.400, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 5 היה 1.200 ועכשיו התעדכן ל 2.400, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 6 היה 0.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 3.600 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 2.400 ועכשיו התעדכן ל 3.600, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 2 היה 2.400 ועכשיו התעדכן ל 3.600, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 3 היה 2.400 ועכשיו התעדכן ל 3.600, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 4 היה 2.400 ועכשיו התעדכן ל 3.600, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 5 היה 2.400 ועכשיו התעדכן ל 3.600, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 6 היה 0.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 4.800 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 3.600 ועכשיו התעדכן ל 4.800, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 2 היה 3.600 ועכשיו התעדכן ל 4.800, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 3 היה 3.600 ועכשיו התעדכן ל 4.800, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 4 היה 3.600 ועכשיו התעדכן ל 4.800, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 5 היה 3.600 ועכשיו התעדכן ל 4.800, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 6 היה 0.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 1, מצביע 2, מצביע 3, מצביע 4 ומצביע 5 הצביעו ל- A, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 6.000 ק\"ג.\nאחרי שבחרנו את A זה מאזן העומסים:\nהעומס על מצביע 1 היה 4.800 ועכשיו התעדכן ל 6.000, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 2 היה 4.800 ועכשיו התעדכן ל 6.000, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 3 היה 4.800 ועכשיו התעדכן ל 6.000, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 4 היה 4.800 ועכשיו התעדכן ל 6.000, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 5 היה 4.800 ועכשיו התעדכן ל 6.000, מכיוון שלקח על עצמו 1.200 ק\"ג.\nהעומס על מצביע 6 היה 0.000 והוא נשאר אותו הדבר.",
      "המועמד B ניצח כי המשקל שלו מתפרס על מצביעים שתומכים בו בצורה הכי טובה. זאת אומרת, מצביע 6 הצביעו ל- B, ואחרי שיעמיסו את המשקל שלו, העומס על כל אחד מהם יהיה 6.000 ק\"ג.\nאחרי שבחרנו את B זה מאזן העומסים:\nהעומס על מצביע 1 היה 6.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 6.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 6.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 6.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 6.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 0.000 ועכשיו התעדכן ל 6.000, מכיוון שלקח על עצמו 6.000 ק\"ג."
    ],
    "unit_cost": [
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 5.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 5.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 2.000 ועכשיו התעדכן ל 3.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 5.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 3.000 ועכשיו התעדכן ל 4.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 5.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 4.000 ועכשיו התעדכן ל 5.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל את סכום המשקלים הגדול ביותר- 5.000.\nאחרי הבחירה ב A, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהמשקל של מצביע 6 היה שווה 5.000 ועכשיו התעדכן ל 6.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.",
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל את סכום המשקלים הגדול ביותר- 6.000.\nאחרי הבחירה ב B, נעדכן את מאזן המשקלים כך:\nהמשקל של מצביע 1 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 2 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 3 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 4 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 5 היה שווה 1.000 ועכשיו התעדכן ל 2.000, מכיוון שהוא אינו מרוצה מהמנצח בסיבוב זה.\nהמשקל של מצביע 6 היה שווה 6.000 והוא נשאר אותו הדבר."
    ]
  }
};