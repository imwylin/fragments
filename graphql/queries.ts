import { gql } from '@apollo/client';

// Query to get noun details
export const GET_NOUN = gql`
  query GetNoun($id: String!) {
    noun(id: $id) {
      id
      tokenId
      owner
      delegate
      created
      background
      body
      accessory
      head
      glasses
    }
  }
`;

// Query to get auction details
export const GET_AUCTION = gql`
  query GetAuction($id: String!) {
    auction(id: $id) {
      id
      nounId
      amount
      startTime
      endTime
      bidder
      settled
      clientId
      bids {
        id
        bidder
        amount
        timestamp
        extended
      }
    }
  }
`;

// Query to get all active auctions
export const GET_ACTIVE_AUCTIONS = gql`
  query GetActiveAuctions {
    auctions(where: { settled: false }, orderBy: endTime, orderDirection: asc) {
      id
      nounId
      amount
      endTime
      bidder
    }
  }
`;

// Query to get recent bids
export const GET_RECENT_BIDS = gql`
  query GetRecentBids($limit: Int!) {
    bids(orderBy: timestamp, orderDirection: desc, first: $limit) {
      id
      auction {
        id
        nounId
      }
      bidder
      amount
      timestamp
    }
  }
`;

// Query to get delegate information
export const GET_DELEGATE = gql`
  query GetDelegate($id: String!) {
    delegate(id: $id) {
      id
      delegator
      delegate
      tokenBalance
      votes
    }
  }
`;

// Query to get proposal candidate details
export const GET_PROPOSAL_CANDIDATE = gql`
  query GetProposalCandidate($id: String!) {
    proposalCandidate(id: $id) {
      id
      proposer
      description
      status
      createdTimestamp
    }
  }
`;

// Query to get recent proposals
export const GET_RECENT_PROPOSALS = gql`
  query GetRecentProposals($limit: Int!) {
    proposals(orderBy: createdTimestamp, orderDirection: desc, first: $limit) {
      id
      proposalId
      proposer
      description
      status
      createdTimestamp
    }
  }
`;

// Query to get proposal details
export const GET_PROPOSAL = gql`
  query GetProposal($id: String!) {
    proposal(id: $id) {
      id
      proposalId
      proposer
      description
      status
      startBlock
      endBlock
      quorumVotes
      proposalThreshold
      createdTimestamp
      votes {
        id
        voter
        support
        votes
        reason
      }
    }
  }
`;

// Query to get recent feedbacks
export const GET_RECENT_FEEDBACKS = gql`
  query GetRecentFeedbacks($limit: Int!) {
    feedbacks(orderBy: id, orderDirection: desc, first: $limit) {
      id
      proposal {
        id
        proposalId
      }
      proposalCandidate {
        id
      }
      sender
      support
      reason
    }
  }
`;

// Query to get fork details
export const GET_FORK = gql`
  query GetFork($id: String!) {
    fork(id: $id) {
      id
      forkId
      forkTreasury
      forkToken
      forkEndTimestamp
      tokensInEscrow
      executed
      joins {
        id
        participant
        tokenIds
        proposalIds
        reason
      }
    }
  }
`;