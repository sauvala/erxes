import { EmptyState, Icon, ModalTrigger, Tip } from 'modules/common/components';
import { __, urlParser } from 'modules/common/utils';
import { ICompany } from 'modules/companies/types';
import { Sidebar } from 'modules/layout/components';
import { SectionBody, SectionBodyItem } from 'modules/layout/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { CompanyChooser } from '../../containers';

type Props = {
  name: string;
  companies?: ICompany[];
  onSelect: (companies: ICompany[]) => void;
};

function CompanySection({ name, companies = [], onSelect }: Props) {
  const { Section } = Sidebar;
  const { Title, QuickButtons } = Section;

  const companyTrigger = (
    <a>
      <Icon icon="add" />
    </a>
  );

  const quickButtons = (
    <ModalTrigger
      title="Associate"
      trigger={companyTrigger}
      size="lg"
      content={props => (
        <CompanyChooser
          {...props}
          data={{ name, companies }}
          onSelect={onSelect}
        />
      )}
    />
  );

  const content = (
    <SectionBody>
      {companies.map((company, index) => (
        <SectionBodyItem key={index}>
          <Link to={`/companies/details/${company._id}`}>
            <Icon icon="logout-2" />
          </Link>
          <span>{company.primaryName || 'N/A'}</span>
          <Tip text={company.website || ''}>
            <a target="_blank" href={`//${company.website}`}>
              {urlParser.extractRootDomain(company.website || '')}
            </a>
          </Tip>
        </SectionBodyItem>
      ))}
      {companies.length === 0 && (
        <EmptyState icon="briefcase" text="No company" />
      )}
    </SectionBody>
  );

  return (
    <Section>
      <Title>{__('Companies')}</Title>

      <QuickButtons>{quickButtons}</QuickButtons>

      {content}
    </Section>
  );
}

export default CompanySection;
