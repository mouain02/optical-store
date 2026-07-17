import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { register as registerUser } from "../redux/slices/authSlice";

export default function RegisterPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
    }
  }, [navigate, user]);

  const onSubmit = ({ confirmPassword, ...values }) => {
    if (values.password !== confirmPassword) return;
    dispatch(registerUser(values));
  };

  return (
    <section className="section-padding py-16 max-w-2xl mx-auto">
      <div className="card p-8 md:p-10">
        <h1 className="text-3xl font-heading uppercase tracking-widest mb-3">{t("auth.register")}</h1>
        <p className="text-sm text-gray-500 mb-8">Create your account to track orders and save favorites.</p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="name">{t("auth.name")}</label>
              <input
                id="name"
                type="text"
                className="input-field"
                placeholder="Type your full name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-red-600 mt-2">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="phone">{t("auth.phone")}</label>
              <input
                id="phone"
                type="tel"
                className="input-field"
                placeholder="Type your phone number"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="email">{t("auth.email")}</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="Type your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="password">{t("auth.password")}</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Create a password"
                {...register("password", { required: "Password is required", minLength: 6 })}
              />
              {errors.password && <p className="text-sm text-red-600 mt-2">Password must be at least 6 characters</p>}
            </div>
          </div>

          <div>
            <label className="label" htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              className="input-field"
              placeholder="Re-type your password"
              {...register("confirmPassword", { required: "Please confirm your password" })}
            />
            {errors.confirmPassword && <p className="text-sm text-red-600 mt-2">{errors.confirmPassword.message}</p>}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? t("common.loading") : t("auth.register")}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          {t("auth.hasAccount")} <Link to="/login" className="text-accent">{t("auth.login")}</Link>
        </p>
      </div>
    </section>
  );
}