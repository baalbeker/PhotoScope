import {Container,Avatar,Box,Text,Stack,InputGroup,Input,InputLeftElement,Icon,FormLabel,Checkbox,Button,Divider,FormControl,Heading,} from "@chakra-ui/react";
import { FaRegEnvelope, FaLock, FaRegUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import DeleteUserDialog from "../../components/ProfileComponents/DeleteUserDialog";
import PageContainer from "../../components/ProfileComponents/PageContainer";
import PageContent from "../../components/ProfileComponents/PageContent";
import ProfileLogic from "../../logic/ProfileLogic/ProfileLogic";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const {name,email,photoURL,family,username} = useContext(AuthContext);
  const {
    avatarInputRef,
    nameInputRef,
    familyInputRef,
    usernameInputRef,
    emailInputRef,
    passwordInputRef,
    handleChangeName,
    handleChangeFamily,
    handleChangeUsername,
    handleChangeEmail,
    handleChangeAvatar,
    handleCurrentPassword,
    handleNewPassword,
    handleConfirmPassword,
    handleDeleteUser,
    handleCancel,
    updateInfo,
  } = ProfileLogic();


  return (
    <PageContainer isFixedNav>
      <PageContent centerContent={true}>
        <Container maxW="container.sm">
          <Heading marginBottom="1.5rem">Edit profile</Heading>

          <Box bg="secondary.card" rounded="lg" p={5}>
            <Avatar size="2xl" src={photoURL} />
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <FormLabel htmlFor="name">Your first name</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegUser} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    name="name"
                    id="name"
                    placeholder={name}
                    onChange={handleChangeName}
                    ref={nameInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="family">Your family name</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegUser} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    name="family"
                    id="family"
                    placeholder={family}
                    onChange={handleChangeFamily}
                    ref={familyInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegUser} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    name="username"
                    id="username"
                    placeholder={username}
                    onChange={handleChangeUsername}
                    ref={usernameInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegEnvelope} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="email"
                    name="email"
                    id="email"
                    placeholder={email}
                    onChange={handleChangeEmail}
                    ref={emailInputRef}
                  />
                </InputGroup>
              </FormControl>

            </Stack>
            <Stack justifyContent="space-between" isInline marginBottom="1rem">
              <Stack isInline>
                <Checkbox
                  size="md"
                  fontWeight="500"
                  colorScheme="main"
                  name="subscribe"
                  id="subscribe"
                >
                  Receive newsletter
                </Checkbox>
              </Stack>
            </Stack>
          </Box>

          <Stack spacing={0} marginTop="2rem" marginBottom="1rem">
            <Heading as="h4" size="md">
              Security settings
            </Heading>
            <Text color="gray.500" fontSize="md">
              Update your password
            </Text>
          </Stack>

          <Box bg="secondary.card" rounded="lg" p={5}>
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="old_password">Current password</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement><Icon as={FaLock} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    name="old_password"
                    id="old_password"
                    type="password"
                    placeholder="Enter your current password"
                    ref={passwordInputRef}
                    onChange={handleCurrentPassword}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_password">New password</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement><Icon as={FaLock} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    name="new_password"
                    id="new_password"
                    type="password"
                    placeholder="Enter your new password"
                    ref={passwordInputRef}
                    onChange={handleNewPassword}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_password2">
                    Confirm new password
                  </FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement><Icon as={FaLock} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    name="new_password2"
                    id="new_password2"
                    type="password"
                    placeholder="Confirm your new password"
                    ref={passwordInputRef}
                    onChange={handleConfirmPassword}

                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_avatar">Upload new avatar</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement><Icon as={FaLock} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="file"
                    accept="image/*"
                    onChange={handleChangeAvatar}
                    ref={avatarInputRef}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Box>

          <Stack direction={["column", "row"]} spacing="1rem" justify="end" marginTop="2rem">
            <Button type="submit" colorScheme="main" variant="outline" onClick={updateInfo}>
              Update settings
            </Button>
            <Button colorScheme="main" variant="outline" onClick={handleCancel}>Cancel</Button>
          </Stack>
          <Divider marginTop="2rem" marginBottom="2rem" orientation="horizontal"/>
          <Box bg="secondary.card" rounded="lg">
            <Stack spacing={0} marginBottom="1rem">
              <Heading as="h4" size="md">
                Danger zone
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Delete your account and data
              </Text>
            </Stack>
            <Stack>
              <DeleteUserDialog handleDeleteUser={handleDeleteUser} />
            </Stack>
            <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
          </Box>
        </Container>
        <Footer/>
      </PageContent>
    </PageContainer>
  );
}
