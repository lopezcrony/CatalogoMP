import { useState } from 'react';
import { INITIAL_HOMOLOGATIONS, INITIAL_INQUIRIES } from '../../../data/bikes';
import { CustomerInquiry, HomologationModel } from '../../../types';

export const useAdminData = () => {
  const [homologations, setHomologations] =
    useState<HomologationModel[]>(INITIAL_HOMOLOGATIONS);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(INITIAL_INQUIRIES);

  const approveHomologation = (homologationId: string) => {
    setHomologations((previous) =>
      previous.map((homologation) =>
        homologation.id === homologationId
          ? { ...homologation, approved: true }
          : homologation
      )
    );
  };

  const updateInquiryStatus = (
    inquiryId: string,
    status: CustomerInquiry['status']
  ) => {
    setInquiries((previous) =>
      previous.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, status } : inquiry
      )
    );
  };

  const addInquiry = (inquiry: CustomerInquiry) => {
    setInquiries((previous) => [inquiry, ...previous]);
  };

  return {
    homologations,
    inquiries,
    approveHomologation,
    updateInquiryStatus,
    addInquiry,
  };
};
