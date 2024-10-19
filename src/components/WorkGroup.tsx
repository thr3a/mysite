import { SegmentedControl, Stack, useMantineTheme } from '@mantine/core';
import type { WorkProps } from '../data/works';
import { WorkData } from '../data/works';
import { Work } from './Work';

type props = {
  workGroup: string;
  setworkGroup: (workGroup: string) => void;
};

export const WorkGroup = ({ workGroup, setworkGroup }: props): JSX.Element => {
  const filteredGroups = (): WorkProps[] => {
    if (workGroup === 'all') {
      return WorkData.filter((x: WorkProps) => x.group !== 'old');
    }
    return WorkData.filter((x: WorkProps) => x.group === workGroup);
  };
  const theme = useMantineTheme();

  return (
    <>
      <SegmentedControl
        value={workGroup}
        color={theme.primaryColor}
        onChange={setworkGroup}
        data={[
          { label: 'すべて', value: 'all' },
          { label: 'AI', value: 'ai' },
          { label: '便利ツール', value: 'tool' },
          { label: '開発', value: 'dev' },
          { label: '🪦', value: 'old' }
        ]}
        mb={'xs'}
      />
      <Stack gap={'xs'}>
        {filteredGroups().map((props) => (
          <Work key={props.url} {...props} />
        ))}
      </Stack>
    </>
  );
};
