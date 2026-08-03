import React from 'react';
import RelationshipsTable from './RelationshipsTable';

interface RelationshipsWrapperProps {
  isAnonymized: boolean;
}

export default function RelationshipsWrapper({ isAnonymized }: RelationshipsWrapperProps) {
  return <RelationshipsTable isAnonymized={isAnonymized} />;
}