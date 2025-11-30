import type { InstanceDayConfig, InstanceVoterConfig } from './types.ts';

export const instanceVoters: Record<string, InstanceVoterConfig[]> =
{
  'complicated': [
    {
      'id': 1,
      'label': 'מצביע 1',
    },
    {
      'id': 2,
      'label': 'מצביע 2',
    },
    {
      'id': 3,
      'label': 'מצביע 3',
    },
    {
      'id': 4,
      'label': 'מצביע 4',
    },
    {
      'id': 5,
      'label': 'מצביע 5',
    },
    {
      'id': 6,
      'label': 'מצביע 6',
    },
  ],
  'few_rounds': [
    {
      'id': 1,
      'label': 'מצביע 1',
    },
    {
      'id': 2,
      'label': 'מצביע 2',
    },
    {
      'id': 3,
      'label': 'מצביע 3',
    },
    {
      'id': 4,
      'label': 'מצביע 4',
    },
    {
      'id': 5,
      'label': 'מצביע 5',
    },
    {
      'id': 6,
      'label': 'מצביע 6',
    },
  ],
  'few_voters': [
    {
      'id': 1,
      'label': 'מצביע 1',
    },
    {
      'id': 2,
      'label': 'מצביע 2',
    },
    {
      'id': 3,
      'label': 'מצביע 3',
    },
  ],
  'simple': [
    {
      'id': 1,
      'label': 'מצביע 1',
    },
    {
      'id': 2,
      'label': 'מצביע 2',
    },
    {
      'id': 3,
      'label': 'מצביע 3',
    },
    {
      'id': 4,
      'label': 'מצביע 4',
    },
    {
      'id': 5,
      'label': 'מצביע 5',
    },
    {
      'id': 6,
      'label': 'מצביע 6',
    },
  ],
}

export const instanceDays: Record<string, Record<string, InstanceDayConfig[]>> =
{
  'complicated': {
    'approval': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
    ],
    'equal_shares': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
    ],
    'phragmen': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
    ],
    'unit_cost': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
    ],
  },
  'few_rounds': {
    'approval': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
    ],
    'equal_shares': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
    ],
    'phragmen': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
    ],
    'unit_cost': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
    ],
  },
  'few_voters': {
    'approval': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'B',
      },
    ],
    'equal_shares': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'C',
      },
    ],
    'phragmen': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'C',
      },
    ],
    'unit_cost': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'A',
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 3,
          },
        ],
        'winner': 'B',
      },
    ],
  },
  'simple': {
    'approval': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
    ],
    'equal_shares': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
    ],
    'phragmen': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
    ],
    'unit_cost': [
      {
        'day': 1,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 2,
        'votes': [
          {
            'selections': [
              'A',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 3,
        'votes': [
          {
            'selections': [
              'B',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'B',
      },
      {
        'day': 4,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'C',
      },
      {
        'day': 5,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'C',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
      {
        'day': 6,
        'votes': [
          {
            'selections': [
              'C',
            ],
            'voterId': 1,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 2,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 3,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 4,
          },
          {
            'selections': [
              'B',
            ],
            'voterId': 5,
          },
          {
            'selections': [
              'A',
            ],
            'voterId': 6,
          },
        ],
        'winner': 'A',
      },
    ],
  },
}

export const instanceBasedExplanations: Record<string, Record<string, string[]>> =
{
  'complicated': {
    'approval': [
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (5 מצביעים הצביעו ל A)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל A)',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל C)',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות (4 מצביעים הצביעו ל B)',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות (4 מצביעים הצביעו ל C)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (5 מצביעים הצביעו ל A)',
    ],
    'equal_shares': [
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6.00, שמתחלקת בין 5 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 6.00\nלמצביע 2 נשאר: 6.00\nלמצביע 3 נשאר: 6.00\nלמצביע 5 נשאר: 6.00\nלמצביע 6 נשאר: 6.00',
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6.00, שמתחלקת בין 3 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 4.80\nלמצביע 2 נשאר: 4.80\nלמצביע 5 נשאר: 4.80',
      'המועמד C נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של C היא 6.00, שמתחלקת בין 3 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 2.80\nלמצביע 2 נשאר: 2.80\nלמצביע 6 נשאר: 2.80',
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6.00, שמתחלקת בין 3 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 3 נשאר: 4.80\nלמצביע 5 נשאר: 2.80\nלמצביע 6 נשאר: 2.80',
      'המועמד A נבחר כי קבוצת התומכים שלו (במקרה הזה רק מצביע אחד) הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6.00, שמתחלקת בין 1 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 4 נשאר: 6.00',
      'המועמד A נבחר כי אמנם אין לו מספיק תומכים לממן אותו, אך גם לשאר המועמדים אין מספיק תומכים לממן אותם. אך מועמד A יכול לאסוף מהתומכים את התקציב הכי קרוב למה שהוא צריך. \nבסף הכל למצביעים שלו יש תקציב: 5.2 (העלות הכוללת של A הוא 6)\nלמצביע 1 נשאר: 0.80\nלמצביע 2 נשאר: 0.80\nלמצביע 3 נשאר: 2.80\nלמצביע 4 נשאר: 0.00\nלמצביע 5 נשאר: 0.80',
    ],
    'phragmen': [
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 1.20\nמצביע 2 סוחב: 1.20\nמצביע 3 סוחב: 1.20\nמצביע 4 סוחב: 0.00\nמצביע 5 סוחב: 1.20\nמצביע 6 סוחב: 1.20',
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 3.20\nמצביע 2 סוחב: 3.20\nמצביע 3 סוחב: 1.20\nמצביע 4 סוחב: 0.00\nמצביע 5 סוחב: 3.20\nמצביע 6 סוחב: 1.20',
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 3.20\nמצביע 2 סוחב: 3.20\nמצביע 3 סוחב: 3.20\nמצביע 4 סוחב: 2.00\nמצביע 5 סוחב: 3.20\nמצביע 6 סוחב: 1.20',
      'המועמד B נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את B:\nמצביע 1 סוחב: 4.70\nמצביע 2 סוחב: 4.70\nמצביע 3 סוחב: 3.20\nמצביע 4 סוחב: 3.50\nמצביע 5 סוחב: 4.70\nמצביע 6 סוחב: 1.20',
      'המועמד C נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את C:\nמצביע 1 סוחב: 4.70\nמצביע 2 סוחב: 6.20\nמצביע 3 סוחב: 4.70\nמצביע 4 סוחב: 3.50\nמצביע 5 סוחב: 6.20\nמצביע 6 סוחב: 2.70',
      'המועמד B נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את B:\nמצביע 1 סוחב: 4.70\nמצביע 2 סוחב: 6.20\nמצביע 3 סוחב: 4.70\nמצביע 4 סוחב: 6.50\nמצביע 5 סוחב: 6.20\nמצביע 6 סוחב: 5.70',
    ],
    'unit_cost': [
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 2 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 3 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 4 היה 1 ועכשיו שווה 2\nהקול של מצביע 5 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 6 שווה 1 ונשאר ככה כי הוא בחר במועמד A',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 1 ועכשיו שווה 2\nהקול של מצביע 2 היה 1 ועכשיו שווה 2\nהקול של מצביע 3 שווה 1 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 4 שווה 2 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 5 היה 1 ועכשיו שווה 2\nהקול של מצביע 6 היה 1 ועכשיו שווה 2',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 2 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 2 שווה 2 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 3 היה 1 ועכשיו שווה 2\nהקול של מצביע 4 היה 2 ועכשיו שווה 3\nהקול של מצביע 5 היה 2 ועכשיו שווה 3\nהקול של מצביע 6 שווה 2 ונשאר ככה כי הוא בחר במועמד C',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 2 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 2 שווה 2 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 3 היה 2 ועכשיו שווה 3\nהקול של מצביע 4 שווה 3 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 5 שווה 3 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 6 היה 2 ועכשיו שווה 3',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 2 ועכשיו שווה 3\nהקול של מצביע 2 שווה 2 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 3 שווה 3 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 4 היה 3 ועכשיו שווה 4\nהקול של מצביע 5 שווה 3 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 6 שווה 3 ונשאר ככה כי הוא בחר במועמד C',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 3 ועכשיו שווה 4\nהקול של מצביע 2 היה 2 ועכשיו שווה 3\nהקול של מצביע 3 היה 3 ועכשיו שווה 4\nהקול של מצביע 4 היה 4 ועכשיו שווה 5\nהקול של מצביע 5 היה 3 ועכשיו שווה 4\nהקול של מצביע 6 שווה 3 ונשאר ככה כי הוא בחר במועמד A',
    ],
  },
  'few_rounds': {
    'approval': [
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל A)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל A)',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל B)',
    ],
    'equal_shares': [
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6.00, שמתחלקת בין 3 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 3.00\nלמצביע 2 נשאר: 3.00\nלמצביע 3 נשאר: 3.00',
      'המועמד C נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של C היא 6.00, שמתחלקת בין 2 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 4 נשאר: 3.00\nלמצביע 5 נשאר: 3.00',
      'המועמד B נבחר כי אמנם אין לו מספיק תומכים לממן אותו, אך גם לשאר המועמדים אין מספיק תומכים לממן אותם. אך מועמד B יכול לאסוף מהתומכים את התקציב הכי קרוב למה שהוא צריך. \nבסף הכל למצביעים שלו יש תקציב: 4 (העלות הכוללת של B הוא 6)\nלמצביע 1 נשאר: 1.00\nלמצביע 2 נשאר: 1.00\nלמצביע 6 נשאר: 3.00',
    ],
    'phragmen': [
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 1.00\nמצביע 2 סוחב: 1.00\nמצביע 3 סוחב: 1.00\nמצביע 4 סוחב: 0.00\nמצביע 5 סוחב: 0.00\nמצביע 6 סוחב: 0.00',
      'המועמד B נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את B:\nמצביע 1 סוחב: 1.00\nמצביע 2 סוחב: 1.00\nמצביע 3 סוחב: 1.00\nמצביע 4 סוחב: 0.00\nמצביע 5 סוחב: 1.50\nמצביע 6 סוחב: 1.50',
      'המועמד C נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את C:\nמצביע 1 סוחב: 1.00\nמצביע 2 סוחב: 1.00\nמצביע 3 סוחב: 2.50\nמצביע 4 סוחב: 1.50\nמצביע 5 סוחב: 1.50\nמצביע 6 סוחב: 1.50',
    ],
    'unit_cost': [
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 2 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 3 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 4 היה 1 ועכשיו שווה 2\nהקול של מצביע 5 היה 1 ועכשיו שווה 2\nהקול של מצביע 6 היה 1 ועכשיו שווה 2',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 1 ועכשיו שווה 2\nהקול של מצביע 2 היה 1 ועכשיו שווה 2\nהקול של מצביע 3 היה 1 ועכשיו שווה 2\nהקול של מצביע 4 היה 2 ועכשיו שווה 3\nהקול של מצביע 5 שווה 2 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 6 שווה 2 ונשאר ככה כי הוא בחר במועמד B',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 2 ועכשיו שווה 3\nהקול של מצביע 2 היה 2 ועכשיו שווה 3\nהקול של מצביע 3 שווה 2 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 4 שווה 3 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 5 שווה 2 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 6 היה 2 ועכשיו שווה 3',
    ],
  },
  'few_voters': {
    'approval': [
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (2 מצביעים הצביעו ל A)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (2 מצביעים הצביעו ל A)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (2 מצביעים הצביעו ל A)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (2 מצביעים הצביעו ל A)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (2 מצביעים הצביעו ל A)',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות (2 מצביעים הצביעו ל B)',
    ],
    'equal_shares': [
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 3.00, שמתחלקת בין 2 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 6.00\nלמצביע 2 נשאר: 6.00',
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 3.00, שמתחלקת בין 2 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 4.50\nלמצביע 2 נשאר: 4.50',
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 3.00, שמתחלקת בין 2 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 3.00\nלמצביע 3 נשאר: 6.00',
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 3.00, שמתחלקת בין 2 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 1.50\nלמצביע 3 נשאר: 4.50',
      'המועמד C נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של C היא 3.00, שמתחלקת בין 1 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 2 נשאר: 3.00',
      'המועמד C נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של C היא 3.00, שמתחלקת בין 1 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 3 נשאר: 3.00',
    ],
    'phragmen': [
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 1.50\nמצביע 2 סוחב: 1.50\nמצביע 3 סוחב: 0.00',
      'המועמד C נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את C:\nמצביע 1 סוחב: 1.50\nמצביע 2 סוחב: 1.50\nמצביע 3 סוחב: 3.00',
      'המועמד B נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את B:\nמצביע 1 סוחב: 1.50\nמצביע 2 סוחב: 4.50\nמצביע 3 סוחב: 3.00',
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 3.00\nמצביע 2 סוחב: 4.50\nמצביע 3 סוחב: 4.50',
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 4.50\nמצביע 2 סוחב: 4.50\nמצביע 3 סוחב: 6.00',
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 6.00\nמצביע 2 סוחב: 6.00\nמצביע 3 סוחב: 6.00',
    ],
    'unit_cost': [
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 2 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 3 היה 1 ועכשיו שווה 2',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 1 ועכשיו שווה 2\nהקול של מצביע 2 היה 1 ועכשיו שווה 2\nהקול של מצביע 3 שווה 2 ונשאר ככה כי הוא בחר במועמד C',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 2 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 2 היה 2 ועכשיו שווה 3\nהקול של מצביע 3 שווה 2 ונשאר ככה כי הוא בחר במועמד A',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 2 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 2 היה 3 ועכשיו שווה 4\nהקול של מצביע 3 שווה 2 ונשאר ככה כי הוא בחר במועמד A',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 2 ועכשיו שווה 3\nהקול של מצביע 2 שווה 4 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 3 היה 2 ועכשיו שווה 3',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 3 ועכשיו שווה 4\nהקול של מצביע 2 היה 4 ועכשיו שווה 5\nהקול של מצביע 3 שווה 3 ונשאר ככה כי הוא בחר במועמד B',
    ],
  },
  'simple': {
    'approval': [
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל A)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל A)',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל B)',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל C)',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל C)',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות (3 מצביעים הצביעו ל A)',
    ],
    'equal_shares': [
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6, שמתחלקת בין 3 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 6.00\nלמצביע 2 נשאר: 6.00\nלמצביע 5 נשאר: 6.00',
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6.00, שמתחלקת בין 3 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 4.00\nלמצביע 4 נשאר: 6.00\nלמצביע 6 נשאר: 6.00',
      'המועמד B נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של B היא 6.00, שמתחלקת בין 3 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 1 נשאר: 2.00\nלמצביע 2 נשאר: 4.00\nלמצביע 3 נשאר: 6.00',
      'המועמד B נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של B היא 6.00, שמתחלקת בין 2 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 3 נשאר: 4.00\nלמצביע 6 נשאר: 4.00',
      'המועמד A נבחר כי קבוצת התומכים שלו הצליחה לממן את הבחירה בו במחיר הכולל הנמוך ביותר:\nהעלות הכוללת של A היא 6.00, שמתחלקת בין 2 מצביעים\nולכל אחד מהמצביעים נשאר מספיק תקציב:\nלמצביע 4 נשאר: 4.00\nלמצביע 5 נשאר: 4.00',
      'המועמד A נבחר כי אמנם אין לו מספיק תומכים לממן אותו, אך גם לשאר המועמדים אין מספיק תומכים לממן אותם. אך מועמד A יכול לאסוף מהתומכים את התקציב הכי קרוב למה שהוא צריך. \nבסף הכל למצביעים שלו יש תקציב: 4\nלמצביע 2 נשאר: 2.00\nלמצביע 3 נשאר: 1.00 \nלמצביע 6 נשאר: 1.00',
    ],
    'phragmen': [
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 2.00\nמצביע 2 סוחב: 2.00\nמצביע 3 סוחב: 0.00\nמצביע 4 סוחב: 0.00\nמצביע 5 סוחב: 2.00\nמצביע 6 סוחב: 0.00',
      'המועמד B נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את B:\nמצביע 1 סוחב: 2.00\nמצביע 2 סוחב: 5.00\nמצביע 3 סוחב: 3.00\nמצביע 4 סוחב: 0.00\nמצביע 5 סוחב: 2.00\nמצביע 6 סוחב: 0.00',
      'המועמד A נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את A:\nמצביע 1 סוחב: 2.00\nמצביע 2 סוחב: 5.00\nמצביע 3 סוחב: 3.00\nמצביע 4 סוחב: 3.00\nמצביע 5 סוחב: 5.00\nמצביע 6 סוחב: 0.00',
      'המועמד B נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את B:\nמצביע 1 סוחב: 2.00\nמצביע 2 סוחב: 5.00\nמצביע 3 סוחב: 6.00\nמצביע 4 סוחב: 3.00\nמצביע 5 סוחב: 5.00\nמצביע 6 סוחב: 3.60',
      'המועמד C נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את C:\nמצביע 1 סוחב: 4.00\nמצביע 2 סוחב: 7.00\nמצביע 3 סוחב: 6.00\nמצביע 4 סוחב: 3.00\nמצביע 5 סוחב: 5.00\nמצביע 6 סוחב: 7.20',
      'המועמד B נבחר כי המשקל שלו מתפרס על המצביעים בצורה הכי טובה (אף אחד לא לוקח על עצמו יותר מידי לעומת אם נבחר במנצח אחר)    \nאחרי שבחרנו את B:\nמצביע 1 סוחב: 4.00\nמצביע 2 סוחב: 7.00\nמצביע 3 סוחב: 6.00\nמצביע 4 סוחב: 6.00\nמצביע 5 סוחב: 8.00\nמצביע 6 סוחב: 7.20',
    ],
    'unit_cost': [
      '\nהמועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 2 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 3 היה 1 ועכשיו שווה 2\nהקול של מצביע 4 היה 1 ועכשיו שווה 2\nהקול של מצביע 5 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 6 היה 1 ועכשיו שווה 2',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 1 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 2 היה 1 ועכשיו שווה 2\nהקול של מצביע 3 היה 2 ועכשיו שווה 3\nהקול של מצביע 4 שווה 2 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 5 היה 1 ועכשיו שווה 2\nהקול של מצביע 6 שווה 2 ונשאר ככה כי הוא בחר במועמד A',
      'המועמד B ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 1 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 2 שווה 2 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 3 שווה 3 ונשאר ככה כי הוא בחר במועמד B\nהקול של מצביע 4 היה 2 ועכשיו שווה 3\nהקול של מצביע 5 היה 2 ועכשיו שווה 3\nהקול של מצביע 6 היה 2 ועכשיו שווה 3',
      'המועמד C ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 שווה 1 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 2 שווה 2 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 3 היה 3 ועכשיו שווה 4\nהקול של מצביע 4 היה 3 ועכשיו שווה 4\nהקול של מצביע 5 שווה 3 ונשאר ככה כי הוא בחר במועמד C\nהקול של מצביע 6 היה 3 ועכשיו שווה 4',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 1 ועכשיו שווה 2\nהקול של מצביע 2 היה 2 ועכשיו שווה 3\nהקול של מצביע 3 היה 4 ועכשיו שווה 5\nהקול של מצביע 4 שווה 4 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 5 שווה 3 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 6 היה 4 ועכשיו שווה 5',
      'המועמד A ניצח כי הוא קיבל הכי הרבה הצבעות ולכן כל מי שלא הצביע לו, הקול של מצביעו בסבבים הבאים יגדל ב-1.\nכלומר נעדכן את מאזן הקולות כך:\nהקול של מצביע 1 היה 2 ועכשיו שווה 3\nהקול של מצביע 2 שווה 3 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 3 שווה 5 ונשאר ככה כי הוא בחר במועמד A\nהקול של מצביע 4 היה 4 ועכשיו שווה 5\nהקול של מצביע 5 היה 3 ועכשיו שווה 4\nהקול של מצביע 6 היה 5 ועכשיו שווה 5',
    ],
  },
}

export const llmGeneratedExplanations: Record<string, Record<string, string[]>> =
{
  'complicated': {},
  'few_rounds': {},
  'few_voters': {},
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
