import {Container,Avatar,Box,Text,Stack,InputGroup,Input,InputLeftElement,Icon,FormLabel,Button,Divider,FormControl,Heading,} from "@chakra-ui/react";
import { FaRegEnvelope, FaLock, FaRegUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import DeleteUserDialog from "../../components/ProfileComponents/DeleteUserDialog";
import PageContainer from "../../components/ProfileComponents/PageContainer";
import PageContent from "../../components/ProfileComponents/PageContent";
import ProfileLogic from "../../logic/ProfileLogic";
import Footer from "../../components/Footer/Footer"
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const {name,email,avatar,family,username, isAdmin} = useContext(AuthContext);
  const {
    avatarInputRef,
    nameInputRef,
    familyInputRef,
    usernameInputRef,
    emailInputRef,
    passwordInputRef,
    adminInputRef,
    handleChangeName,
    handleChangeFamily,
    handleChangeUsername,
    handleChangeEmail,
    handleChangeAvatar,
    handleAddAdmin,
    handleCurrentPassword,
    handleNewPassword,
    handleConfirmPassword,
    handleDeleteUser,
    handleCancel,
    updateInfo,
    addAdmin,
  } = ProfileLogic();


  return (
    <PageContainer isFixedNav>
      <PageContent centerContent={true}>
        <Container maxW="container.sm">
          <Heading mt={5} mb={3}>Профил</Heading>

          <Box bg="secondary.card" rounded="lg" p={5}>
            <Avatar size="2xl" src={avatar} />
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <FormLabel htmlFor="name">Име</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegUser} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    id="name"
                    placeholder={name}
                    onChange={handleChangeName}
                    ref={nameInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="family">Фамилия</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegUser} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    id="family"
                    placeholder={family}
                    onChange={handleChangeFamily}
                    ref={familyInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="username">Никнейм</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegUser} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    id="username"
                    placeholder={username}
                    onChange={handleChangeUsername}
                    ref={usernameInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Имейл</FormLabel>
                <InputGroup>
                  <InputLeftElement><Icon as={FaRegEnvelope} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    type="email"
                    id="email"
                    placeholder={email}
                    onChange={handleChangeEmail}
                    ref={emailInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_avatar">Смени профилна снимка</FormLabel>
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

          <Stack spacing={0} marginTop="2rem" marginBottom="1rem">
            <Heading as="h4" size="md">
              Защита
            </Heading>
            <Text color="gray.500" fontSize="md">
              Сменете парола
            </Text>
          </Stack>

          <Box bg="secondary.card" rounded="lg" p={5}>
            <Stack spacing={4} marginBottom="1rem">

            {isAdmin && (
              <FormControl>
              <Stack justifyContent="space-between" isInline>
                <FormLabel htmlFor="old_password">Добави админ</FormLabel>
              </Stack>
              <InputGroup>
                <Input
                  focusBorderColor="main.500"
                  type="email"
                  placeholder="Enter user email"
                  ref={adminInputRef}
                  onChange={handleAddAdmin}
                />
                <Button ml={2} colorScheme="main" variant="outline" onClick={addAdmin}>Добави</Button>
              </InputGroup>
            </FormControl>
            )}

              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="old_password">Сегашна парола</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement><Icon as={FaLock} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
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
                  <FormLabel htmlFor="new_password">Нова парола</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement><Icon as={FaLock} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
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
                    Потвърди нова парола
                  </FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement><Icon as={FaLock} color="secondary.inputHelper" /></InputLeftElement>
                  <Input
                    focusBorderColor="main.500"
                    id="new_password2"
                    type="password"
                    placeholder="Confirm your new password"
                    ref={passwordInputRef}
                    onChange={handleConfirmPassword}

                  />
                </InputGroup>
              </FormControl>
              
            </Stack>
          </Box>

          <Stack direction={["column", "row"]} spacing="1rem" justify="end" marginTop="2rem">
            <Button type="submit" colorScheme="main" variant="outline" onClick={updateInfo}>
              Запиши промени
            </Button>
            <Button colorScheme="main" variant="outline" onClick={handleCancel}>Откажи</Button>
          </Stack>
          <Divider marginTop="2rem" marginBottom="2rem" orientation="horizontal"/>
          <Box bg="secondary.card" rounded="lg">
            <Stack spacing={0} marginBottom="1rem">
              <Heading as="h4" size="md">
                Опасна зона
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Изтрийте профила си
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
