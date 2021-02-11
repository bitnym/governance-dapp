/**
 *
 * ProposalRow
 *
 */

import React from 'react';
import { Proposal, ProposalState } from 'types/Proposal';
import { Link, useLocation } from 'react-router-dom';
import Linkify from 'react-linkify';
import styled from 'styled-components/macro';
import { useGetProposalCreateEvent } from '../../hooks/useGetProposalCreateEvent';
import { useGetProposalState } from '../../hooks/useGetProposalState';
import { ProposalStatusBadge } from '../../components/ProposalStatusBadge';
import { ProposalRowStateBadge } from '../../components/ProposalRowStateBadge';

interface Props {
  proposal: Proposal;
}

const StyledBar = styled.div`
  width: 100%;
  max-width: 100px;
  display: flex;
  height: 10px;
  flex-wrap: nowrap;
  margin: 5px 0 5px auto;
  border-radius: 8px;
  overflow: hidden;
  .progress__blue {
    width: 50%;
    background: rgb(78, 205, 196);
    background: linear-gradient(
      90deg,
      rgba(78, 205, 196, 1) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }
  .progress__red {
    width: 50%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(205, 78, 78, 1) 100%
    );
  }
`;

export function ProposalRow({ proposal }: Props) {
  const { loading: loadingCreated, value: created } = useGetProposalCreateEvent(
    proposal,
  );
  const { loading: loadingState, state } = useGetProposalState(proposal);
  const location = useLocation();

  if (loadingState || loadingCreated || !created || !state) {
    return (
      <>
        <tr>
          <td>
            <div className="flex justify-between items-center w-full space-x-4 py-5 px-5">
              <div className="w-full skeleton h-4" />
              <div className="w-full skeleton h-4" />
            </div>
          </td>
          <td>
            <div className="flex justify-between items-center w-full space-x-4 py-5 px-5">
              <div className="w-full skeleton h-4" />
              <div className="w-full skeleton h-4" />
            </div>
          </td>
          <td>
            <div className="flex justify-between items-center w-full space-x-4 py-5 px-5">
              <div className="w-full skeleton h-4" />
              <div className="w-full skeleton h-4" />
            </div>
          </td>
          <td>
            <div className="flex justify-between items-center w-full space-x-4 py-5 px-5">
              <div className="w-full skeleton h-4" />
              <div className="w-full skeleton h-4" />
            </div>
          </td>
          <td>
            <div className="flex justify-between items-center w-full space-x-4 py-5 px-5">
              <div className="w-full skeleton h-4" />
              <div className="w-full skeleton h-4" />
            </div>
          </td>
        </tr>
      </>
    );
  }

  return (
    <>
      <tr key={proposal.id}>
        {state === ProposalState.Active ? (
          <>
            <td className="font-montserrat max-w-sm">
              <div className="flex items-start tracking-normal">
                <b className="whitespace-no-wrap block mr-1">
                  SIP {String(proposal.id).padStart(3, '0')}.
                </b>
                <div className="break-all max-h-12 overflow-hidden">
                  <Linkify newTab={true}>{created.description}</Linkify>
                </div>
              </div>
            </td>
            <td className="text-center hidden xl:table-cell">#{proposal.id}</td>
            <td className="text-center hidden xl:table-cell">
              <ProposalStatusBadge state={state} />
              <StyledBar>
                <div className="progress__blue"></div>
                <div className="progress__red"></div>
              </StyledBar>
            </td>
            <td className="text-center hidden xl:table-cell">
              {proposal.endBlock} - #{proposal.id}
            </td>
            <td className="text-center">
              <Link
                to={{
                  pathname: `/proposals/${proposal.id}`,
                  state: { background: location },
                }}
                className="text-gold hover:text-gold hover:underline font-thin font-montserrat tracking-normal"
              >
                View Proposal
              </Link>
            </td>
          </>
        ) : (
          <>
            <td className="font-montserrat xl:max-w-sm">
              <div className="flex items-start tracking-normal">
                <b className="whitespace-no-wrap block mr-1">
                  SIP {String(proposal.id).padStart(3, '0')}.
                </b>
                <div className="break-all max-h-12 xl:overflow-hidden">
                  <Linkify newTab={true}>
                    {created.description || 'Title.'}
                  </Linkify>
                </div>
              </div>
            </td>
            <td className="text-center hidden xl:table-cell tracking-normal">
              #{proposal.id}
            </td>
            <td className="text-center hidden xl:table-cell">
              <ProposalRowStateBadge state={state} />
            </td>
            <td className="text-center hidden xl:table-cell tracking-normal">
              {proposal.endBlock} - #{proposal.id}
            </td>
            <td className="text-center">
              <Link
                to={{
                  pathname: `/proposals/${proposal.id}`,
                  state: { background: location },
                }}
                className="text-gold hover:text-gold hover:underline font-thin font-montserrat tracking-normal"
              >
                View Proposal
              </Link>
            </td>
          </>
        )}
      </tr>
    </>
  );
}
