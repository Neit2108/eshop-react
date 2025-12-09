import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { type SignupFormData } from "@/types";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signup(formData);
      if (res.payload) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Điền thông tin của bạn bên dưới để tạo tài khoản mới.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="last-name">Họ và tên đệm</FieldLabel>
          <Input
            id="last-name"
            name="lastName"
            type="text"
            placeholder="Nguyen van"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Tên</FieldLabel>
          <Input
            id="name"
            name="firstName"
            type="text"
            placeholder="Anh"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <FieldDescription>
            Chúng tôi sẽ không bao giờ chia sẻ email của bạn với người khác.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <FieldDescription>
            Mật khẩu phải có ít nhất 8 ký tự.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Xác nhận mật khẩu</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <FieldDescription>Vui lòng xác nhận mật khẩu.</FieldDescription>
        </Field>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.
          </div>
        )}

        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
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
            Đăng ký với GitHub
          </Button>
          <FieldDescription className="px-6 text-center">
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
