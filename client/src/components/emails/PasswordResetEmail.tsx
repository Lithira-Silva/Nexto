import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface PasswordResetEmailProps {
  resetUrl: string
  userEmail?: string
}

export function PasswordResetEmailTemplate({
  resetUrl,
  userEmail = 'user@example.com',
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your NexTo password - Action required</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="bg-white rounded-t-lg px-8 py-6 border-b border-gray-200">
              <Row>
                <Text className="text-2xl font-bold text-purple-600 m-0">
                  🚀 NexTo
                </Text>
                <Text className="text-gray-500 text-sm m-0 mt-1">
                  Premium Task Management
                </Text>
              </Row>
            </Section>

            {/* Main Content */}
            <Section className="bg-white px-8 py-8">
              <Heading className="text-2xl font-bold text-gray-900 mb-6">
                🔐 Password Reset Request
              </Heading>
              
              <Text className="text-gray-700 text-base leading-6 mb-4">
                Hello! 👋
              </Text>
              
              <Text className="text-gray-700 text-base leading-6 mb-4">
                We received a request to reset your password for your <strong>NexTo</strong> account ({userEmail}).
              </Text>
              
              <Text className="text-gray-700 text-base leading-6 mb-6">
                Click the button below to securely reset your password:
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-8">
                <Button
                  href={resetUrl}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-base no-underline"
                >
                  🔐 Reset My Password
                </Button>
              </Section>

              <Text className="text-gray-700 text-sm leading-5 mb-4">
                Or copy and paste this link into your browser:
              </Text>
              
              <Section className="bg-gray-100 rounded-md p-4 mb-6">
                <Link
                  href={resetUrl}
                  className="text-purple-600 text-sm break-all font-mono"
                >
                  {resetUrl}
                </Link>
              </Section>

              {/* Security Warning */}
              <Section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <Text className="text-yellow-800 font-semibold text-sm m-0 mb-2">
                  ⚠️ Important Security Information:
                </Text>
                <Text className="text-yellow-700 text-sm m-0 leading-5">
                  • This link will <strong>expire in 1 hour</strong> for your security<br/>
                  • If you didn&apos;t request this reset, you can safely ignore this email<br/>
                  • Never share this link with anyone<br/>
                  • We will never ask for your password via email
                </Text>
              </Section>

              <Text className="text-gray-700 text-base leading-6 mb-4">
                If you have any questions or need assistance, please don&apos;t hesitate to contact our support team.
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-2">
                Stay productive! 💜
              </Text>
              <Text className="text-gray-900 font-semibold text-base m-0">
                The NexTo Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-100 rounded-b-lg px-8 py-6">
              <Text className="text-gray-500 text-center text-sm m-0 mb-2">
                © {new Date().getFullYear()} NexTo - Your Premium Task Management Solution
              </Text>
              <Text className="text-gray-400 text-center text-xs m-0">
                This is an automated email. Please do not reply to this message.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default PasswordResetEmailTemplate