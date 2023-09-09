using Application.Models;
using FluentValidation;

namespace Application.Validation
{
    public class ONGAccountValidation : AbstractValidator<Login>
    {
        public ONGAccountValidation()
        {
            ValidaEmail();
            ValidaPassword();
        }

        private void ValidaEmail()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required");
        }
        
        private void ValidaPassword()
        {
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required");
        }
    }
}
