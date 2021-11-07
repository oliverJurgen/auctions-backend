export const Users = {
  'dXNlcjE6cGFzc3dvcmQ=': {
    userId: '1',
    auth: {
      username: 'user1',
      password: 'password',
      token: 'dXNlcjM6cGFzc3dvcmQ=',
    },

    bidData: {
      currentAutoBidSum: 0,
      maximumBidAmount: 1000000,
      bidAlertPercentage: 60,
    },
  },
  'dXNlcjI6cGFzc3dvcmQ=': {
    userId: '2',
    auth: {
      username: 'user2',
      password: 'password',
      token: 'dXNlcjM6cGFzc3dvcmQ=',
    },
    bidData: {
      currentAutoBidSum: 5,
      maximumBidAmount: 2000,
      bidAlertPercentage: 70,
    },
  },
  'dXNlcjM6cGFzc3dvcmQ=': {
    userId: '3',
    auth: {
      username: 'user3',
      password: 'password',
      token: 'dXNlcjM6cGFzc3dvcmQ=',
    },
    bidData: {
      currentAutoBidSum: 0,
      maximumBidAmount: 3000,
      bidAlertPercentage: 80,
    },
  },
};

export type UserType = {
  userId: string;
  auth: {
    username: string;
    password: string;
    token: string;
  };
  bidData: {
    currentAutoBidSum: number;
    maximumBidAmount: number;
    bidAlertPercentage: number;
  };
};
