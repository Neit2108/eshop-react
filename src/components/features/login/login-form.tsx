import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { isStrongPassword, isValidEmail } from "@/lib/helpers/validation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "Email không được để trống";
        if (!isValidEmail(value)) return "Email không hợp lệ";
        return "";
      case "password":
        if (!value) return "Mật khẩu không được để trống";
        if (value.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
        if (!isStrongPassword(value))
          return "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
    
    // Validate field in real-time
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Clear previous errors khi submit mới
    setValidationError("");

    // Validate all fields
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    setFieldErrors({
      email: emailError,
      password: passwordError,
    });

    // If any error exists, stop submission
    if (emailError || passwordError) {
      setValidationError("Vui lòng sửa lỗi trước khi tiếp tục");
      return;
    }

    // Dispatch login action
    login(formData.email, formData.password);
  };

  // Listen to error and isAuthenticated changes from Redux state
  useEffect(() => {
    // ✅ Nếu login thành công, navigate ngay
    if (isAuthenticated && !error) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, error, navigate, from]);

  // ✅ Riêng logic hiển thị error
  useEffect(() => {
    if (error && !isLoading) {
      setValidationError(error);
    }
  }, [error, isLoading]);

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Đăng nhập tài khoản</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Nhập email của bạn bên dưới để đăng nhập vào tài khoản
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.email && (
            <FieldDescription className="text-red-600 text-sm mt-1">
              {fieldErrors.email}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="********"
            className={fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.password && (
            <FieldDescription className="text-red-600 text-sm mt-1">
              {fieldErrors.password}
            </FieldDescription>
          )}
        </Field>

        {(validationError || error) && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {validationError || error}
          </div>
        )}

        <Field>
          <Button 
            type="submit" 
            disabled={isLoading || Object.values(fieldErrors).some(error => error)}
            className={Object.values(fieldErrors).some(error => error) ? "opacity-75 cursor-not-allowed" : ""}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </Field>
        <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Đăng nhập với GitHub
          </Button>
          <FieldDescription className="text-center">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signup" className="underline underline-offset-4">
              Đăng ký ngay
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

