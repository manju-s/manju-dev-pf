import { useRef } from 'react';
import { AppShell, Group, Anchor, Text, Container, Stack, Box, ScrollArea, Burger } from '@mantine/core';
import { ThemeToggle } from "./ThemeToggle";
import { useDisclosure } from '@mantine/hooks';

const PortfolioLandingPage = () => {
    const viewport = useRef(null);

    const aboutMeRef = useRef(null);
    const workExperienceRef = useRef(null);
    const contactRef = useRef(null);

    const [opened, { toggle }] = useDisclosure();

    const handleScroll = (ref) => {
        if (ref.current && viewport.current) {
            viewport.current.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify='space-between' style={{ flex: 1 }}>
                        <Text size="lg" fw={700}>My Portfolio</Text>
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            <Anchor component="button" onClick={() => handleScroll(aboutMeRef)} size="sm">About Me</Anchor>
                            <Anchor component="button" onClick={() => handleScroll(workExperienceRef)} size="sm">Work Experience</Anchor>
                            <Anchor component="button" onClick={() => handleScroll(contactRef)} size="sm">Contact</Anchor>
                            <ThemeToggle />
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <Anchor component="button" onClick={() => handleScroll(aboutMeRef)} size="sm">About Me</Anchor>
                <Anchor component="button" onClick={() => handleScroll(workExperienceRef)} size="sm">Work Experience</Anchor>
                <Anchor component="button" onClick={() => handleScroll(contactRef)} size="sm">Contact</Anchor>
                <ThemeToggle />
            </AppShell.Navbar>

            <AppShell.Main>
                <ScrollArea style={{ height: 'calc(100vh - 60px)' }} viewportRef={viewport}>
                    <Stack gap="xl">
                        {/* About Me Section */}
                        <Box ref={aboutMeRef} id="about-me" py="xl" style={{ minHeight: '100vh', borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                            <Container size="md">
                                <Text variant="h1" size="xl" fw={700} mb="md">About Me</Text>
                                <Text>
                                    This is the about me section. Here you can put information about your skills, background, and what you do.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    <br /><br />
                                    Feel free to expand this section with more details about your professional journey and personal interests.
                                </Text>
                            </Container>
                        </Box>

                        {/* Work Experience Section */}
                        <Box ref={workExperienceRef} id="work-experience" py="xl" style={{ minHeight: '100vh', borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                            <Container size="md">
                                <Text variant="h1" size="xl" fw={700} mb="md">Work Experience</Text>
                                <Text>
                                    This is the work experience section. Detail your professional roles, responsibilities, and achievements here.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    <br /><br />
                                    Include specific projects, technologies used, and quantifiable results where possible.
                                </Text>
                            </Container>
                        </Box>

                        {/* Contact Section */}
                        <Box ref={contactRef} id="contact" py="xl" style={{ minHeight: '100vh' }}>
                            <Container size="md">
                                <Text variant="h1" size="xl" fw={700} mb="md">Contact</Text>
                                <Text>
                                    This is the contact section. Provide ways for people to reach you, such as an email address,
                                    social media links, or a contact form.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    <br /><br />
                                    Make it easy for potential employers or collaborators to get in touch!
                                </Text>
                            </Container>
                        </Box>
                    </Stack>
                </ScrollArea>
            </AppShell.Main>
        </AppShell>
    );
};
export default PortfolioLandingPage;