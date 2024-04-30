import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		dob: "",
        gender: "",
        nationality: "",
        location: "",
        interests: "",
        preferredPlatformsOfEvent: "",
        occupation: "",
        instagram: "",
		password: "",
	});

	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);

	const handleSignup = async () => {
		try {
			const res = await fetch("/api/users/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			showToast("Error", error, "error");
		}
	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl isRequired>
									<FormLabel>Full name</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
										value={inputs.name}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
										value={inputs.username}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								value={inputs.email}
							/>
						</FormControl>
						<FormControl isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input
                                type='date'
                                onChange={(e) => setInputs({ ...inputs, dob: e.target.value })}
                                value={inputs.dob}
                            />
                        </FormControl>
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>
                                <Input
                                    type='text'
                                    onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                                    value={inputs.gender}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Nationality</FormLabel>
                                <Input
                                    type='text'
                                    onChange={(e) => setInputs({ ...inputs, nationality: e.target.value })}
                                    value={inputs.nationality}
                                />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel>Location</FormLabel>
                                <Input
                                    type='text'
                                    onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                                    value={inputs.location}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Interests</FormLabel>
                                <Input
                                    type='text'
                                    onChange={(e) => setInputs({ ...inputs, interests: e.target.value })}
                                    value={inputs.interests}
                                />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel>Preferred Platforms of Event</FormLabel>
                                <Input
                                    type='text'
                                    onChange={(e) => setInputs({ ...inputs, preferredPlatformsOfEvent: e.target.value })}
                                    value={inputs.preferredPlatformsOfEvent}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Occupation</FormLabel>
                                <Input
                                    type='text'
                                    onChange={(e) => setInputs({ ...inputs, occupation: e.target.value })}
                                    value={inputs.occupation}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel>Instagram</FormLabel>
                            <Input
                                type='text'
                                onChange={(e) => setInputs({ ...inputs, instagram: e.target.value })}
                                value={inputs.instagram}
                            />
                        </FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
									value={inputs.password}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
