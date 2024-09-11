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

export const GET_NOUNS_BY_OWNER = gql`
  query GetNounsByOwner($owner: String!, $first: Int, $skip: Int) {
    nouns(where: { owner: $owner }, orderBy: tokenId, orderDirection: asc, first: $first, skip: $skip) {
      id
      tokenId
      background
      body
      accessory
      head
      glasses
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

export const GET_TOP_DELEGATES = gql`
  query GetTopDelegates($first: Int, $skip: Int) {
    delegates(orderBy: votes, orderDirection: desc, first: $first, skip: $skip) {
      id
      delegate
      tokenBalance
      votes
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

export const GET_AUCTION_HISTORY = gql`
  query GetAuctionHistory($first: Int, $skip: Int) {
    auctions(orderBy: endTime, orderDirection: desc, first: $first, skip: $skip) {
      id
      nounId
      amount
      startTime
      endTime
      bidder
      settled
    }
  }
`;

export const GET_BIDS_BY_BIDDER = gql`
  query GetBidsByBidder($bidder: String!, $first: Int, $skip: Int) {
    bids(where: { bidder: $bidder }, orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
      id
      auction {
        id
        nounId
      }
      amount
      timestamp
      extended
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

// Signature Queries
export const GET_RECENT_SIGNATURES = gql`
  query GetRecentSignatures($first: Int, $skip: Int) {
    signatures(orderBy: expirationTimestamp, orderDirection: desc, first: $first, skip: $skip) {
      id
      signer
      signature
      expirationTimestamp
      canceled
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

export const GET_PROPOSALS_BY_STATUS = gql`
  query GetProposalsByStatus($status: String!, $first: Int, $skip: Int) {
    proposals(where: { status: $status }, orderBy: createdTimestamp, orderDirection: desc, first: $first, skip: $skip) {
      id
      proposalId
      proposer
      description
      status
      createdTimestamp
    }
  }
`;

export const GET_FEEDBACKS_FOR_PROPOSAL = gql`
  query GetFeedbacksForProposal($proposalId: String!, $first: Int, $skip: Int) {
    feedbacks(where: { proposal: $proposalId }, orderBy: id, orderDirection: desc, first: $first, skip: $skip) {
      id
      sender
      support
      reason
    }
  }
`;

// Vote Queries
export const GET_VOTES_FOR_PROPOSAL = gql`
  query GetVotesForProposal($proposalId: String!, $first: Int, $skip: Int) {
    votes(where: { proposal: $proposalId }, orderBy: votes, orderDirection: desc, first: $first, skip: $skip) {
      id
      voter
      support
      votes
      reason
      clientId
    }
  }
`;

export const GET_VOTES_BY_VOTER = gql`
  query GetVotesByVoter($voter: String!, $first: Int, $skip: Int) {
    votes(where: { voter: $voter }, orderBy: id, orderDirection: desc, first: $first, skip: $skip) {
      id
      proposal {
        id
        proposalId
        description
      }
      support
      votes
      reason
    }
  }
`;

