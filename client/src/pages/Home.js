// @mui
import { styled } from '@mui/material/styles';
import {Typography} from '@mui/material';

// components
import Page from '../components/Page';
// sections
// import {
//   HomeHero,
//   HomeMinimal,
//   HomeDarkMode,
//   HomeLookingFor,
//   HomeColorPresets,
//   HomePricingPlans,
//   HomeAdvertisement,
//   HomeCleanInterfaces,
//   HomeHugePackElements,
// } from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="The starting point for your next project">
      <RootStyle>
        {/* <HomeHero /> */}
        <ContentStyle>
          <Typography>This is HOME</Typography>
          {/* <HomeMinimal />

          <HomeHugePackElements />

          <HomeDarkMode />

          <HomeColorPresets />

          <HomeCleanInterfaces />

          <HomePricingPlans />

          <HomeLookingFor />

          <HomeAdvertisement /> */}
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
