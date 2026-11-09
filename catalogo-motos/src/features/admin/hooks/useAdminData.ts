import { useState } from 'react';
import { INITIAL_HOMOLOGATIONS } from '../../../data/bikes';
import { HomologationModel } from '../../../types';

export const useAdminData = () => {
  const [homologations, setHomologations] =
    useState<HomologationModel[]>(INITIAL_HOMOLOGATIONS);

  const approveHomologation = (homologationId: string) => {
    setHomologations((previous) =>
      previous.map((homologation) =>
        homologation.id === homologationId
          ? { ...homologation, approved: true }
          : homologation
      )
    );
  };

  return {
    homologations,
    approveHomologation,
  };
};
