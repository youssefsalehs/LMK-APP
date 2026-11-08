import VerifyForm from "../../components/verifyForm/VerifyForm";
import useVerifyLogin from "../../hooks/useVerifyLogin";
export default function VerificationLogin() {
  const { mutate, isPending } = useVerifyLogin();
  return (
    <div>
      <VerifyForm mutate={mutate} isPending={isPending} />
    </div>
  );
}
