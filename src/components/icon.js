import Image from 'next/image';
import brandIcon from '@/public/icons/brand-icon.svg';
import gearIcon from '@/public/icons/gear-icon.svg';
import divider from '@/public/icons/divider-icon.svg';

function WrapperIcon({ path, alt, ...props }) {
  return <Image src={path} alt={alt} {...props} />;
}

export const BrandIcon = () => {
  return <WrapperIcon path={brandIcon} alt="Brand logo icon." width={16} height={16} />;
};

export const GearIcon = () => {
  return <WrapperIcon path={gearIcon} alt="Gear icon." width={20} height={20} />;
};

export const DividerIcon = () => {
  return <WrapperIcon path={divider} alt="Deivider." width={14} height={14} />;
};
