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
      "המועמד B ניצח כי הקבוצה שהצביעה לו (מצביע 2, מצביע 5, מצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 .\n\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 6.000 ועכשיו התעדכן ל: 4.000.\nלמצביע 3 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 6.000 ועכשיו התעדכן ל: 4.000.\nלמצביע 6 היה תקציב 6.000 ועכשיו התעדכן ל: 4.000.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 2, מצביע 5, מצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 .\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 4.000 ועכשיו התעדכן ל: 2.000.\nלמצביע 3 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 4.000 ועכשיו התעדכן ל: 2.000.\nלמצביע 6 היה תקציב 4.000 ועכשיו התעדכן ל: 2.000.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 .\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 ועכשיו התעדכן ל: 4.000.\nלמצביע 2 היה תקציב 2.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 3 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 2.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 2.000 ועכשיו התעדכן ל: 0.000.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3, מצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 .\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 4.000 ועכשיו התעדכן ל: 2.000.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 6.000 ועכשיו התעדכן ל: 4.000.\nלמצביע 4 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 2.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 4) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 4.000 .\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 2.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 4.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 6.000 ועכשיו התעדכן ל: 2.000.\nלמצביע 5 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 3, מצביע 4, מצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 4.000 .\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 4.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 4 היה תקציב 2.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 5 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר."
    ],
    "phragmen": [
      "המועמד B ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את B:\nהעומס על מצביע 1 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 0.000 ועכשיו התעדכן ל: 2.000.\nהעומס על מצביע 3 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 0.000 ועכשיו התעדכן ל: 2.000.\nהעומס על מצביע 6 היה 0.000 ועכשיו התעדכן ל: 2.000.",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע 1 היה 0.000 ועכשיו התעדכן ל: 3.000.\nהעומס על מצביע 2 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 0.000 ועכשיו התעדכן ל: 3.000.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 2.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע 1 היה 3.000 ועכשיו התעדכן ל: 4.333.\nהעומס על מצביע 2 היה 2.000 ועכשיו התעדכן ל: 4.333.\nהעומס על מצביע 3 היה 3.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 2.000 ועכשיו התעדכן ל: 4.333.",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע 1 היה 4.333 ועכשיו התעדכן ל: 5.111.\nהעומס על מצביע 2 היה 4.333 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 3.000 ועכשיו התעדכן ל: 5.111.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 ועכשיו התעדכן ל: 5.111.\nהעומס על מצביע 6 היה 4.333 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע 1 היה 5.111 ועכשיו התעדכן ל: 5.556.\nהעומס על מצביע 2 היה 4.333 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 5.111 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 ועכשיו התעדכן ל: 5.556.\nהעומס על מצביע 5 היה 5.111 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 4.333 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע 1 היה 5.556 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 4.333 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 5.111 ועכשיו התעדכן ל: 7.259.\nהעומס על מצביע 4 היה 5.556 ועכשיו התעדכן ל: 7.259.\nהעומס על מצביע 5 היה 5.111 ועכשיו התעדכן ל: 7.259.\nהעומס על מצביע 6 היה 4.333 והוא נשאר אותו הדבר."
    ],
    "unit_cost": [
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל הכי הרבה קולות.\nאחרי הבחירה ב B, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 4 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה שווה 1.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 2 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 5 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 6 היה 1.000 ועכשיו התעדכן ל: 2.000.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 2 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 4 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 5 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 2 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 3 היה שווה 3.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה 4.000 ועכשיו התעדכן ל: 5.000.\nהקול של מצביע 5 היה שווה 3.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה 2.000 ועכשיו התעדכן ל: 3.000.",
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל הכי הרבה קולות.\nאחרי הבחירה ב B, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 2 היה שווה 3.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 4 היה 5.000 ועכשיו התעדכן ל: 6.000.\nהקול של מצביע 5 היה שווה 3.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה שווה 3.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 2 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 3 היה שווה 4.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה שווה 6.000 והוא נשאר אותו הדבר.\nהקול של מצביע 5 היה שווה 3.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה 3.000 ועכשיו התעדכן ל: 4.000."
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
      "המועמד D ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3, מצביע 4, מצביע 5, מצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.200 .\n\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 6.000 ועכשיו התעדכן ל: 4.800.\nלמצביע 2 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 6.000 ועכשיו התעדכן ל: 4.800.\nלמצביע 4 היה תקציב 6.000 ועכשיו התעדכן ל: 4.800.\nלמצביע 5 היה תקציב 6.000 ועכשיו התעדכן ל: 4.800.\nלמצביע 6 היה תקציב 6.000 ועכשיו התעדכן ל: 4.800.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3, מצביע 4, מצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.500 .\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 4.800 ועכשיו התעדכן ל: 3.300.\nלמצביע 2 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 4.800 ועכשיו התעדכן ל: 3.300.\nלמצביע 4 היה תקציב 4.800 ועכשיו התעדכן ל: 3.300.\nלמצביע 5 היה תקציב 4.800 ועכשיו התעדכן ל: 3.300.\nלמצביע 6 היה תקציב 4.800 והוא נשאר אותו הדבר.",
      "המועמד B ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 3, מצביע 4) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 .\n\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 3.300 ועכשיו התעדכן ל: 1.300.\nלמצביע 2 היה תקציב 6.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 3.300 ועכשיו התעדכן ל: 1.300.\nלמצביע 4 היה תקציב 3.300 ועכשיו התעדכן ל: 1.300.\nלמצביע 5 היה תקציב 3.300 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 4.800 והוא נשאר אותו הדבר.",
      "המועמד D ניצח כי הקבוצה שהצביעה לו (מצביע 2, מצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 .\n\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 6.000 ועכשיו התעדכן ל: 3.000.\nלמצביע 3 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 3.300 ועכשיו התעדכן ל: 0.300.\nלמצביע 6 היה תקציב 4.800 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (מצביע 2, מצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 .\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 3.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 3 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 0.300 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 4.800 ועכשיו התעדכן ל: 1.800.",
      "המועמד D נבחר למרות שאין לתומכים שלו מספיק תקציב לממן אותו, אך גם לא ניתן לממן מועמדים אחרים..\nומועמד D יכול לאסוף מהתומכים את התקציב הכי גבוה.\n\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.300 ועכשיו התעדכן ל: 0.000.\nלמצביע 2 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 1.300 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 0.300 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 1.800 ועכשיו התעדכן ל: 0.000."
    ],
    "phragmen": [
      "המועמד D ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את D:\nהעומס על מצביע 1 היה 0.000 ועכשיו התעדכן ל: 1.200.\nהעומס על מצביע 2 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 0.000 ועכשיו התעדכן ל: 1.200.\nהעומס על מצביע 4 היה 0.000 ועכשיו התעדכן ל: 1.200.\nהעומס על מצביע 5 היה 0.000 ועכשיו התעדכן ל: 1.200.\nהעומס על מצביע 6 היה 0.000 ועכשיו התעדכן ל: 1.200.",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע 1 היה 1.200 ועכשיו התעדכן ל: 2.700.\nהעומס על מצביע 2 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 1.200 ועכשיו התעדכן ל: 2.700.\nהעומס על מצביע 4 היה 1.200 ועכשיו התעדכן ל: 2.700.\nהעומס על מצביע 5 היה 1.200 ועכשיו התעדכן ל: 2.700.\nהעומס על מצביע 6 היה 1.200 והוא נשאר אותו הדבר.",
      "המועמד D ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את D:\nהעומס על מצביע 1 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 0.000 ועכשיו התעדכן ל: 3.600.\nהעומס על מצביע 3 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 1.200 ועכשיו התעדכן ל: 3.600.",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע 1 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 3.600 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 2.700 ועכשיו התעדכן ל: 4.700.\nהעומס על מצביע 4 היה 2.700 ועכשיו התעדכן ל: 4.700.\nהעומס על מצביע 5 היה 2.700 ועכשיו התעדכן ל: 4.700.\nהעומס על מצביע 6 היה 3.600 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע 1 היה 2.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 3.600 ועכשיו התעדכן ל: 6.600.\nהעומס על מצביע 3 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 3.600 ועכשיו התעדכן ל: 6.600.",
      "המועמד D ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את D:\nהעומס על מצביע 1 היה 2.700 ועכשיו התעדכן ל: 7.650.\nהעומס על מצביע 2 היה 6.600 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 4.700 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 6.600 ועכשיו התעדכן ל: 7.650."
    ],
    "unit_cost": [
      "המועמד D ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, D קיבל הכי הרבה קולות.\nאחרי הבחירה ב D, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 2 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה שווה 1.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 2 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 3 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה 1.000 ועכשיו התעדכן ל: 2.000.",
      "המועמד D ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, D קיבל הכי הרבה קולות.\nאחרי הבחירה ב D, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 2 היה שווה 3.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 4 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 5 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 2 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 5 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה 2.000 ועכשיו התעדכן ל: 3.000.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 2 היה שווה 4.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 4 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 5 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 6 היה שווה 3.000 והוא נשאר אותו הדבר.",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 4.000 ועכשיו התעדכן ל: 5.000.\nהקול של מצביע 2 היה שווה 4.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 4 היה שווה 3.000 והוא נשאר אותו הדבר.\nהקול של מצביע 5 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 6 היה שווה 3.000 והוא נשאר אותו הדבר."
    ]
  },
  "few_rounds": {
    "approval": [
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל C.",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות.\n3 מצביעים הצביעו ל A.",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות.\n5 מצביעים הצביעו ל C."
    ],
    "equal_shares": [
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 2.000 .\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 3.000 ועכשיו התעדכן ל: 1.000.\nלמצביע 2 היה תקציב 3.000 ועכשיו התעדכן ל: 1.000.\nלמצביע 3 היה תקציב 3.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 3.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 3.000 ועכשיו התעדכן ל: 1.000.\nלמצביע 6 היה תקציב 3.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (מצביע 3, מצביע 6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 .\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.000 והוא נשאר אותו הדבר.\nלמצביע 2 היה תקציב 1.000 והוא נשאר אותו הדבר.\nלמצביע 3 היה תקציב 3.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 4 היה תקציב 3.000 והוא נשאר אותו הדבר.\nלמצביע 5 היה תקציב 1.000 והוא נשאר אותו הדבר.\nלמצביע 6 היה תקציב 3.000 ועכשיו התעדכן ל: 0.000.",
      "המועמד B ניצח כי הקבוצה שהצביעה לו (מצביע 1, מצביע 2, מצביע 4, מצביע 5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 3.000 .\n\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע 1 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 2 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 3 היה תקציב 0.000 והוא נשאר אותו הדבר.\nלמצביע 4 היה תקציב 3.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 5 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000.\nלמצביע 6 היה תקציב 0.000 והוא נשאר אותו הדבר."
    ],
    "phragmen": [
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע 1 היה 0.000 ועכשיו התעדכן ל: 2.000.\nהעומס על מצביע 2 היה 0.000 ועכשיו התעדכן ל: 2.000.\nהעומס על מצביע 3 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 0.000 ועכשיו התעדכן ל: 2.000.\nהעומס על מצביע 6 היה 0.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע 1 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 2 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 3 היה 0.000 ועכשיו התעדכן ל: 3.000.\nהעומס על מצביע 4 היה 0.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 5 היה 2.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 6 היה 0.000 ועכשיו התעדכן ל: 3.000.",
      "המועמד B ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את B:\nהעומס על מצביע 1 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהעומס על מצביע 2 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהעומס על מצביע 3 היה 3.000 והוא נשאר אותו הדבר.\nהעומס על מצביע 4 היה 0.000 ועכשיו התעדכן ל: 3.000.\nהעומס על מצביע 5 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהעומס על מצביע 6 היה 3.000 והוא נשאר אותו הדבר."
    ],
    "unit_cost": [
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 2 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 4 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 5 היה שווה 1.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה 1.000 ועכשיו התעדכן ל: 2.000.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 2 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה 2.000 ועכשיו התעדכן ל: 3.000.\nהקול של מצביע 5 היה 1.000 ועכשיו התעדכן ל: 2.000.\nהקול של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר.",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 2 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 3 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 4 היה 3.000 ועכשיו התעדכן ל: 4.000.\nהקול של מצביע 5 היה שווה 2.000 והוא נשאר אותו הדבר.\nהקול של מצביע 6 היה שווה 2.000 והוא נשאר אותו הדבר."
    ]
  }
};
