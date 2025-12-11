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
  "few_rounds_1": [
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
  "few_rounds_2": [
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
        "winner": "A"
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
  "few_rounds_1": {
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
  "few_rounds_2": {
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
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B",
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "D"
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
              "C"
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
              "B"
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
              "A",
              "D"
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
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A",
              "B",
              "C",
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
              "A",
              "B",
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
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B",
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "D"
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
              "C"
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
              "B"
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
              "A",
              "D"
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
        "winner": "A"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A",
              "B",
              "C",
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
              "A",
              "B",
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
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B",
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "D"
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
              "C"
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
              "B"
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
              "A",
              "D"
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
        "winner": "B"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A",
              "B",
              "C",
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
              "A",
              "B",
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
              "B",
              "C"
            ],
            "voterId": 2
          },
          {
            "selections": [
              "B",
              "D"
            ],
            "voterId": 3
          },
          {
            "selections": [
              "B",
              "D"
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
              "C"
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
              "B"
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
              "A",
              "D"
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
        "winner": "B"
      },
      {
        "day": 3,
        "votes": [
          {
            "selections": [
              "A",
              "B",
              "C",
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
              "A",
              "B",
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
      }
    ]
  }
};

export const instanceBasedExplanations: Record<string, Record<string, string[]>> =
{
  "simple": {
    "approval": [
      "המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל B",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל C",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל A",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל C",
      "המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל B",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל A"
    ],
    "equal_shares": [
      "המועמד B ניצח כי הקבוצה שהצביעה לו (v2, v5, v6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.333\n\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 1.000 ועכשיו התעדכן ל: 0.667\nלמצביע v3 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 1.000 ועכשיו התעדכן ל: 0.667\nלמצביע v6 היה תקציב 1.000 ועכשיו התעדכן ל: 0.667",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (v2, v5, v6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.333\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 0.667 ועכשיו התעדכן ל: 0.333\nלמצביע v3 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 0.667 ועכשיו התעדכן ל: 0.333\nלמצביע v6 היה תקציב 0.667 ועכשיו התעדכן ל: 0.333",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (v1, v2, v6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.333\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 ועכשיו התעדכן ל: 0.667\nלמצביע v2 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000\nלמצביע v3 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 0.333 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (v1, v3, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.333\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.667 ועכשיו התעדכן ל: 0.333\nלמצביע v2 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 1.000 ועכשיו התעדכן ל: 0.667\nלמצביע v4 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000\nלמצביע v6 היה תקציב 0.000 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (v1, v4) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.667\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000\nלמצביע v2 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 0.667 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 1.000 ועכשיו התעדכן ל: 0.333\nלמצביע v5 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 0.000 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (v3, v4, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.667\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 0.667 ועכשיו התעדכן ל: 0.000\nלמצביע v4 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000\nלמצביע v5 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 0.000 והוא נשאר אותו הדבר"
    ],
    "phragmen": [
      "המועמד B ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את B:\nהעומס על מצביע v1 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v2 היה 0.000 ועכשיו התעדכן ל 0.333\nהעומס על מצביע v3 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.000 ועכשיו התעדכן ל 0.333\nהעומס על מצביע v6 היה 0.000 ועכשיו התעדכן ל 0.333",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע v1 היה 0.000 ועכשיו התעדכן ל 0.500\nהעומס על מצביע v2 היה 0.333 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.000 ועכשיו התעדכן ל 0.500\nהעומס על מצביע v4 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.333 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 0.333 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע v1 היה 0.500 ועכשיו התעדכן ל 0.722\nהעומס על מצביע v2 היה 0.333 ועכשיו התעדכן ל 0.722\nהעומס על מצביע v3 היה 0.500 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.333 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 0.333 ועכשיו התעדכן ל 0.722",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע v1 היה 0.722 ועכשיו התעדכן ל 0.852\nהעומס על מצביע v2 היה 0.722 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.500 ועכשיו התעדכן ל 0.852\nהעומס על מצביע v4 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.333 ועכשיו התעדכן ל 0.852\nהעומס על מצביע v6 היה 0.722 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע v1 היה 0.852 ועכשיו התעדכן ל 0.926\nהעומס על מצביע v2 היה 0.722 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.852 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.000 ועכשיו התעדכן ל 0.926\nהעומס על מצביע v5 היה 0.852 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 0.722 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע v1 היה 0.926 והוא נשאר אותו הדבר\nהעומס על מצביע v2 היה 0.722 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.852 ועכשיו התעדכן ל 1.210\nהעומס על מצביע v4 היה 0.926 ועכשיו התעדכן ל 1.210\nהעומס על מצביע v5 היה 0.852 ועכשיו התעדכן ל 1.210\nהעומס על מצביע v6 היה 0.722 והוא נשאר אותו הדבר"
    ],
    "unit_cost": [
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל הכי הרבה קולות.\nאחרי הבחירה ב B, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v2 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v3 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v4 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v5 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v6 היה שווה 1.000 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v2 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v3 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v4 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v5 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v6 היה 1.000 ועכשיו התעדכן ל 2.000",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v2 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v3 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v4 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v5 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v6 היה שווה 2.000 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v2 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v3 היה שווה 3.000 והוא נשאר אותו הדבר\nהקול של v4 היה 4.000 ועכשיו התעדכן ל 5.000\nהקול של v5 היה שווה 3.000 והוא נשאר אותו הדבר\nהקול של v6 היה 2.000 ועכשיו התעדכן ל 3.000",
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל הכי הרבה קולות.\nאחרי הבחירה ב B, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v2 היה שווה 3.000 והוא נשאר אותו הדבר\nהקול של v3 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v4 היה 5.000 ועכשיו התעדכן ל 6.000\nהקול של v5 היה שווה 3.000 והוא נשאר אותו הדבר\nהקול של v6 היה שווה 3.000 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v2 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v3 היה שווה 4.000 והוא נשאר אותו הדבר\nהקול של v4 היה שווה 6.000 והוא נשאר אותו הדבר\nהקול של v5 היה שווה 3.000 והוא נשאר אותו הדבר\nהקול של v6 היה 3.000 ועכשיו התעדכן ל 4.000"
    ]
  },
  "complicated": {
    "approval": [
      "המועמד D ניצח כי הוא קיבל הכי הרבה הצבעות\n5 מצביעים הצביעו ל D",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות\n4 מצביעים הצביעו ל C",
      "המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל B",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל A",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל C",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל A"
    ],
    "equal_shares": [
      "המועמד D ניצח כי הקבוצה שהצביעה לו (v1, v3, v4, v5, v6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.200\n\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 ועכשיו התעדכן ל: 0.800\nלמצביע v2 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 1.000 ועכשיו התעדכן ל: 0.800\nלמצביע v4 היה תקציב 1.000 ועכשיו התעדכן ל: 0.800\nלמצביע v5 היה תקציב 1.000 ועכשיו התעדכן ל: 0.800\nלמצביע v6 היה תקציב 1.000 ועכשיו התעדכן ל: 0.800",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (v1, v3, v4, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.250\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.800 ועכשיו התעדכן ל: 0.550\nלמצביע v2 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 0.800 ועכשיו התעדכן ל: 0.550\nלמצביע v4 היה תקציב 0.800 ועכשיו התעדכן ל: 0.550\nלמצביע v5 היה תקציב 0.800 ועכשיו התעדכן ל: 0.550\nלמצביע v6 היה תקציב 0.800 והוא נשאר אותו הדבר",
      "המועמד B ניצח כי הקבוצה שהצביעה לו (v1, v3, v4) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.333\n\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.550 ועכשיו התעדכן ל: 0.217\nלמצביע v2 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 0.550 ועכשיו התעדכן ל: 0.217\nלמצביע v4 היה תקציב 0.550 ועכשיו התעדכן ל: 0.217\nלמצביע v5 היה תקציב 0.550 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 0.800 והוא נשאר אותו הדבר",
      "המועמד D ניצח כי הקבוצה שהצביעה לו (v2, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.500\n\nאחרי הבחירה ב D זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 1.000 ועכשיו התעדכן ל: 0.500\nלמצביע v3 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 0.550 ועכשיו התעדכן ל: 0.050\nלמצביע v6 היה תקציב 0.800 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (v2, v6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.500\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 0.500 ועכשיו התעדכן ל: 0.000\nלמצביע v3 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 0.050 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 0.800 ועכשיו התעדכן ל: 0.300",
      "המועמד A נבחר למרות שאין לתומכים שלו מספיק תקציב לממן אותו, אך גם לא ניתן לממן מועמדים אחרים.\nומועמד A יכול לאסוף מהתומכים את התקציב הכי גבוה.\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 0.217 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 0.217 ועכשיו התעדכן ל: 0.000\nלמצביע v5 היה תקציב 0.050 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 0.300 ועכשיו התעדכן ל: 0.000"
    ],
    "phragmen": [
      "המועמד D ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את D:\nהעומס על מצביע v1 היה 0.000 ועכשיו התעדכן ל 0.200\nהעומס על מצביע v2 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.000 ועכשיו התעדכן ל 0.200\nהעומס על מצביע v4 היה 0.000 ועכשיו התעדכן ל 0.200\nהעומס על מצביע v5 היה 0.000 ועכשיו התעדכן ל 0.200\nהעומס על מצביע v6 היה 0.000 ועכשיו התעדכן ל 0.200",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע v1 היה 0.200 ועכשיו התעדכן ל 0.450\nהעומס על מצביע v2 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.200 ועכשיו התעדכן ל 0.450\nהעומס על מצביע v4 היה 0.200 ועכשיו התעדכן ל 0.450\nהעומס על מצביע v5 היה 0.200 ועכשיו התעדכן ל 0.450\nהעומס על מצביע v6 היה 0.200 והוא נשאר אותו הדבר",
      "המועמד D ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את D:\nהעומס על מצביע v1 היה 0.450 והוא נשאר אותו הדבר\nהעומס על מצביע v2 היה 0.000 ועכשיו התעדכן ל 0.600\nהעומס על מצביע v3 היה 0.450 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.450 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.450 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 0.200 ועכשיו התעדכן ל 0.600",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע v1 היה 0.450 והוא נשאר אותו הדבר\nהעומס על מצביע v2 היה 0.600 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.450 ועכשיו התעדכן ל 0.783\nהעומס על מצביע v4 היה 0.450 ועכשיו התעדכן ל 0.783\nהעומס על מצביע v5 היה 0.450 ועכשיו התעדכן ל 0.783\nהעומס על מצביע v6 היה 0.600 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את A:\nהעומס על מצביע v1 היה 0.450 והוא נשאר אותו הדבר\nהעומס על מצביע v2 היה 0.600 ועכשיו התעדכן ל 1.100\nהעומס על מצביע v3 היה 0.783 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.783 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.783 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 0.600 ועכשיו התעדכן ל 1.100",
      "המועמד D ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את D:\nהעומס על מצביע v1 היה 0.450 ועכשיו התעדכן ל 1.275\nהעומס על מצביע v2 היה 1.100 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.783 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.783 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.783 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 1.100 ועכשיו התעדכן ל 1.275"
    ],
    "unit_cost": [
      "המועמד D ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, D קיבל הכי הרבה קולות.\nאחרי הבחירה ב D, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v2 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v3 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v4 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v5 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v6 היה שווה 1.000 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v2 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v3 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v4 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v5 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v6 היה 1.000 ועכשיו התעדכן ל 2.000",
      "המועמד D ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, D קיבל הכי הרבה קולות.\nאחרי הבחירה ב D, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v2 היה שווה 3.000 והוא נשאר אותו הדבר\nהקול של v3 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v4 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v5 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v6 היה שווה 2.000 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v2 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v3 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v4 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v5 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v6 היה 2.000 ועכשיו התעדכן ל 3.000",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v2 היה שווה 4.000 והוא נשאר אותו הדבר\nהקול של v3 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v4 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v5 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v6 היה שווה 3.000 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, A קיבל הכי הרבה קולות.\nאחרי הבחירה ב A, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 4.000 ועכשיו התעדכן ל 5.000\nהקול של v2 היה שווה 4.000 והוא נשאר אותו הדבר\nהקול של v3 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v4 היה שווה 3.000 והוא נשאר אותו הדבר\nהקול של v5 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v6 היה שווה 3.000 והוא נשאר אותו הדבר"
    ]
  },
  "few_rounds_1": {
    "approval": [
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל C",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות\n3 מצביעים הצביעו ל A",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות\n5 מצביעים הצביעו ל C"
    ],
    "equal_shares": [
      "המועמד C ניצח כי הקבוצה שהצביעה לו (v1, v2, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.667\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 ועכשיו התעדכן ל: 0.333\nלמצביע v2 היה תקציב 1.000 ועכשיו התעדכן ל: 0.333\nלמצביע v3 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 1.000 ועכשיו התעדכן ל: 0.333\nלמצביע v6 היה תקציב 1.000 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי הקבוצה שהצביעה לו (v3, v6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.000\n\nאחרי הבחירה ב C זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.333 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 0.333 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000\nלמצביע v4 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 0.333 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000",
      "המועמד B ניצח כי הקבוצה שהצביעה לו (v1, v2, v4, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.000\n\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000\nלמצביע v2 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000\nלמצביע v3 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000\nלמצביע v5 היה תקציב 0.333 ועכשיו התעדכן ל: 0.000\nלמצביע v6 היה תקציב 0.000 והוא נשאר אותו הדבר"
    ],
    "phragmen": [
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע v1 היה 0.000 ועכשיו התעדכן ל 0.333\nהעומס על מצביע v2 היה 0.000 ועכשיו התעדכן ל 0.333\nהעומס על מצביע v3 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.000 ועכשיו התעדכן ל 0.333\nהעומס על מצביע v6 היה 0.000 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע v1 היה 0.333 והוא נשאר אותו הדבר\nהעומס על מצביע v2 היה 0.333 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.000 ועכשיו התעדכן ל 0.500\nהעומס על מצביע v4 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.333 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 0.000 ועכשיו התעדכן ל 0.500",
      "המועמד B ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את B:\nהעומס על מצביע v1 היה 0.333 ועכשיו התעדכן ל 0.500\nהעומס על מצביע v2 היה 0.333 ועכשיו התעדכן ל 0.500\nהעומס על מצביע v3 היה 0.500 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.000 ועכשיו התעדכן ל 0.500\nהעומס על מצביע v5 היה 0.333 ועכשיו התעדכן ל 0.500\nהעומס על מצביע v6 היה 0.500 והוא נשאר אותו הדבר"
    ],
    "unit_cost": [
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v2 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v3 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v4 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v5 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v6 היה 1.000 ועכשיו התעדכן ל 2.000",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v2 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v3 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v4 היה 2.000 ועכשיו התעדכן ל 3.000\nהקול של v5 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v6 היה שווה 2.000 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v2 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v3 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v4 היה 3.000 ועכשיו התעדכן ל 4.000\nהקול של v5 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v6 היה שווה 2.000 והוא נשאר אותו הדבר"
    ]
  },
  "few_rounds_2": {
    "approval": [
      "המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות\n4 מצביעים הצביעו ל B",
      "המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות\n4 מצביעים הצביעו ל A",
      "המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות\n4 מצביעים הצביעו ל C"
    ],
    "equal_shares": [
      "המועמד B ניצח כי הקבוצה שהצביעה לו (v2, v3, v4, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.500\n\nאחרי הבחירה ב B זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 1.000 ועכשיו התעדכן ל: 0.500\nלמצביע v3 היה תקציב 1.000 ועכשיו התעדכן ל: 0.500\nלמצביע v4 היה תקציב 1.000 ועכשיו התעדכן ל: 0.500\nלמצביע v5 היה תקציב 1.000 ועכשיו התעדכן ל: 0.500\nלמצביע v6 היה תקציב 1.000 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (v2, v3, v4, v5) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 0.500\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 והוא נשאר אותו הדבר\nלמצביע v2 היה תקציב 0.500 ועכשיו התעדכן ל: 0.000\nלמצביע v3 היה תקציב 0.500 ועכשיו התעדכן ל: 0.000\nלמצביע v4 היה תקציב 0.500 ועכשיו התעדכן ל: 0.000\nלמצביע v5 היה תקציב 0.500 ועכשיו התעדכן ל: 0.000\nלמצביע v6 היה תקציב 1.000 והוא נשאר אותו הדבר",
      "המועמד A ניצח כי הקבוצה שהצביעה לו (v1, v5, v6) הצליחה לממן את הבחירה בו, כאשר כל אחד מחברי הקבוצה משלם לכל היותר 1.000\n\nאחרי הבחירה ב A זה מאזן התקציב לכל מצביע:\nלמצביע v1 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000\nלמצביע v2 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v3 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v4 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v5 היה תקציב 0.000 והוא נשאר אותו הדבר\nלמצביע v6 היה תקציב 1.000 ועכשיו התעדכן ל: 0.000"
    ],
    "phragmen": [
      "המועמד B ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את B:\nהעומס על מצביע v1 היה 0.000 והוא נשאר אותו הדבר\nהעומס על מצביע v2 היה 0.000 ועכשיו התעדכן ל 0.250\nהעומס על מצביע v3 היה 0.000 ועכשיו התעדכן ל 0.250\nהעומס על מצביע v4 היה 0.000 ועכשיו התעדכן ל 0.250\nהעומס על מצביע v5 היה 0.000 ועכשיו התעדכן ל 0.250\nהעומס על מצביע v6 היה 0.000 והוא נשאר אותו הדבר",
      "המועמד B ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את B:\nהעומס על מצביע v1 היה 0.000 ועכשיו התעדכן ל 0.417\nהעומס על מצביע v2 היה 0.250 ועכשיו התעדכן ל 0.417\nהעומס על מצביע v3 היה 0.250 והוא נשאר אותו הדבר\nהעומס על מצביע v4 היה 0.250 והוא נשאר אותו הדבר\nהעומס על מצביע v5 היה 0.250 והוא נשאר אותו הדבר\nהעומס על מצביע v6 היה 0.000 ועכשיו התעדכן ל 0.417",
      "המועמד C ניצח כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה. זאת אומרת, אף מצביע לא לוקח על עצמו יותר מידי.\nאחרי שבחרנו את C:\nהעומס על מצביע v1 היה 0.417 ועכשיו התעדכן ל 0.542\nהעומס על מצביע v2 היה 0.417 והוא נשאר אותו הדבר\nהעומס על מצביע v3 היה 0.250 ועכשיו התעדכן ל 0.542\nהעומס על מצביע v4 היה 0.250 ועכשיו התעדכן ל 0.542\nהעומס על מצביע v5 היה 0.250 ועכשיו התעדכן ל 0.542\nהעומס על מצביע v6 היה 0.417 והוא נשאר אותו הדבר"
    ],
    "unit_cost": [
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל הכי הרבה קולות.\nאחרי הבחירה ב B, נעדכן את מאזן הקולות כך:\nהקול של v1 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v2 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v3 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v4 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v5 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v6 היה 1.000 ועכשיו התעדכן ל 2.000",
      "המועמד B ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, B קיבל הכי הרבה קולות.\nאחרי הבחירה ב B, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v2 היה שווה 1.000 והוא נשאר אותו הדבר\nהקול של v3 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v4 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v5 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v6 היה שווה 2.000 והוא נשאר אותו הדבר",
      "המועמד C ניצח כי אם ניקח בחשבון את המשקל של כל מצביע, C קיבל הכי הרבה קולות.\nאחרי הבחירה ב C, נעדכן את מאזן הקולות כך:\nהקול של v1 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v2 היה 1.000 ועכשיו התעדכן ל 2.000\nהקול של v3 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v4 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v5 היה שווה 2.000 והוא נשאר אותו הדבר\nהקול של v6 היה 2.000 ועכשיו התעדכן ל 3.000"
    ]
  }
};

export const llmGeneratedExplanations: Record<string, Record<string, string[]>> =
{
  'complicated': {},
  'few_rounds_1': {},
  'few_rounds_2': {},
  'simple': {
    'approval': [
      'רוב המצביעים ביום זה ציינו את A, ולכן A היא האפשרות שקיבלה את התמיכה הרחבה ביותר מבין שלושת המועמדים המוזכרים.',
      'גם ביום זה A מופיעה אצל מספר גדול יותר של מצביעים לעומת B ו-C, ולכן היא נבחרת שוב על בסיס היקף התמיכה היחסי.',
      'ביום זה מופיעה תמיכה רחבה במיוחד ב-B, הגדולה מזו של A ו-C, ולכן הבחירה נוטה ל-B.',
      'דפוס ההצבעות מראה שרוב המצביעים ביום זה ציינו את C לעומת שאר האפשרויות, ולכן C היא הנבחרת.',
      'גם ביום הזה C ממשיכה להופיע אצל מספר מצביעים גדול יותר מאשר A או B, ולכן היא ממשיכה להיות האפשרות המובילה.',
      'ביום השישי מתבלטת A כמועמדת שקיבלה את מספר האזכורים הגדול ביותר, ולכן היא נבחרת ביחס ל-B ו-C.',
    ],
    'equal_shares': [
      'A נבחר משום שקיבל תמיכה מקבוצת המצביעים הגדולה ביותר (מצביעים 1, 2 ו־5), ולכן היה ניתן לכסות את העלות שלו מתוך החלקים השווים של התומכים ביתר קלות מאשר אצל B או C.',
      'למרות שמצביע 1 כבר השתתף בכיסוי של A ביום הראשון, התמיכה המשולבת של מצביעים 1, 4 ו־6 הייתה עדיין מספקת כדי לממן שוב את A מתוך חלקיהם, במיוחד משום שלא התפתחה קבוצה בעלת יכולת מימון חזקה יותר עבור B או C ביום זה.',
      'B זכה משום שקיבל תמיכה מרוכזת משלושה מצביעים (1, 2 ו־3), שאצלם החלקים הזמינים עדיין אפשרו לממן אותו. לעומת זאת, A ו־C נתמכו על ידי מצביעים שמספרם הכולל או החלקים שנותרו להם היה נמוך יותר.',
      'B נבחר שוב משום שהקבוצה התומכת בו (מצביעים 3 ו־6) הייתה בעלת יכולת מימון גבוהה יותר באותו שלב, לאחר שהחלקים של תומכי A ו־C נשחקו יותר בימים הקודמים. כך התאפשר לבסס את B כמועמד היחיד שניתן לכסות את עלותו.',
      'A זכה משום שהתמיכה בו (מצביעים 4 ו־5) התבססה על מצביעים שנותרו אצלם חלקים פנויים יותר לעומת תומכי B או C. כתוצאה מכך, היה ניתן לכסות את עלותו של A בעוד שלמועמדים האחרים לא הייתה קבוצת תומכים בעלת יכולת מימון מספקת.',
      'A נבחר שוב, הפעם בזכות התמיכה של מצביעים 2, 3 ו־6, שאצלם נותרו חלקים זמינים דיים כדי לממן את A. קבוצות התומכים של B ו־C לא היו בעלות יכולת מימון דומה ביום זה, ולכן A היה המועמד היחיד שאפשר היה לממן.',
    ],
    'phragmen': [
      'A נבחר משום שתמיכתם של מצביעים 1, 2 ו-5 מאפשרת להקצות את העומס הראשוני באופן מאוזן יותר לעומת האפשרויות האחרות, ללא יצירת ריכוז עומס אצל קבוצה קטנה של מצביעים.',
      'B נבחר כיוון שהוספתו מאזנת טוב יותר את חלוקת העומס שנצברה לאחר יום 1: התמיכה של מצביעים 2 ו-3 מאפשרת פיזור עומס שלא מגדיל יתר על המידה את העומס על אותם מצביעים שתמכו ב-A ביום הקודם.',
      'A נבחר משום שהסתמכות על מצביעים 4 ו-5, שלא נשאו עומס משמעותי עד כה, יוצרת שילוב שמביא לאיזון גבוה יותר ביחס לחלופות, במיוחד לאור התמיכה הרחבה ב-B ביום זה שעלולה לצופף עומס אם B היה נבחר.',
      'B נבחר כיוון שהתמיכה של מצביעים 3 ו-6 מספקת פיזור נוסף על פני מצביעים שלא נשאו את מרבית העומס בימים הקודמים. לעומת זאת, בחירה ב-C או A הייתה מטילה חלק גדול יותר על מצביעים שכבר נשאו עומס גבוה.',
      'C נבחר משום ששלושה מצביעים (1, 2 ו-6) שתמכו בו אינם מהמצביעים שנשאו עד כה את החלק הכבד ביותר, ולכן בחירה זו מפחיתה את פערי העומס בהשוואה לבחירה ב-A או B, שהיו מטילות עומס נוסף על מצביעים שכבר השתתפו יותר.',
      'B נבחר מאחר שהעומס מתפזר כאן בעיקר דרך מצביעים 4 ו-5, שהשתתפותם עד כה מייצרת תוספת מאוזנת יותר לעומת אפשרות בחירה ב-A או C, שבשתיהן התמיכה מתמקדת במצביעים שנשאו חלק משמעותי יותר בימים הקודמים.',
    ],
  },
}
