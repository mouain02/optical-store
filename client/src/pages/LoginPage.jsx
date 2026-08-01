import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { login } from "../redux/slices/authSlice";

export default function LoginPage() {
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
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/dashboard", { replace: true });
    }
  }, [navigate, user]);

  const onSubmit = async (values) => {
  const result = await dispatch(login(values));

  alert(JSON.stringify(result, null, 2));
};
};
  return (
    <section className="section-padding py-16 max-w-xl mx-auto">
      <div className="card p-8 md:p-10">
        <h1 className="text-3xl font-heading uppercase tracking-widest mb-3">{t("auth.login")}</h1>
        <p className="text-sm text-gray-500 mb-8">Access your account and orders.</p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Type your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-sm text-red-600 mt-2">{errors.password.message}</p>}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? t("common.loading") : t("auth.login")}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          {t("auth.noAccount")} <Link to="/register" className="text-accent">{t("nav.register")}</Link>
        </p>
      </div>
    </section>
  );
}