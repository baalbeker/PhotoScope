import { Flex, Text, Icon, Menu, MenuButton, Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function NavItem({
  icon,
  title,
  active,
  link,
  friendRequestCount,
}) {
  const navigate = useNavigate();
  const handleNavigation = () => navigate(link);

  return (
    <Flex mt={30} flexDir="column" w="100%">
      <Menu placement="right">
        <div
          onClick={handleNavigation}
          style={{
            backgroundColor: active && "#AEC8CA",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "white" : "gray.500"}
              />
              <Text ml={5}>{title}</Text>
              {title === "Friends" && friendRequestCount > 0 && (
                <Badge
                  color="white"
                  fontSize="0.7em"
                  borderRadius="full"
                  bg="red.500"
                  ml={5}
                  mt={0.5}
                  boxSize="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {friendRequestCount}
                </Badge>
              )}
            </Flex>
          </MenuButton>
        </div>
      </Menu>
    </Flex>
  );
}

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  friendRequestCount: PropTypes.number,
};
