import { Image, Center } from '@mantine/core';

export const MyImage = () => {
  return (
    <Center>
      <Image
        width={100}
        height={100}
        radius="xl"
        src="./icon.jpg"
        alt="cute cat!"
      />
    </Center>
  );
};