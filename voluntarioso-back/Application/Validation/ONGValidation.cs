using Domain.Entities;
using FluentValidation;

namespace Application.Validation
{
    public class ONGValidation : AbstractValidator<ONG>
    {
        public ONGValidation()
        {
            ValidaEmail();
            ValidaPassword();
            ValidaName();
            ValidaCNPJ();
            ValidaCategory();
            ValidaMission();
            ValidaActions();
            ValidaCause();
        }

        private void ValidaEmail()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email é obrigatório");
        }

        private void ValidaPassword()
        {
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Senha é obrigatório");
        }

        private void ValidaName()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Nome é obrigatório");
        }

        private void ValidaCNPJ()
        {
            RuleFor(x => x.CNPJ)
                .NotEmpty().WithMessage("CNPJ é obrigatório");
        }

        private void ValidaCategory()
        {
            RuleFor(x => x.Category)
                .NotEmpty().WithMessage("Categoria é obrigatório");
        }
        
        private void ValidaMission()
        {
            RuleFor(x => x.Mission)
                .NotEmpty().WithMessage("Missão é obrigatório");
        }

        private void ValidaActions()
        {
            RuleFor(x => x.Actions)
                .NotEmpty().WithMessage("Ações é obrigatório");
        }

        private void ValidaCause()
        {
            RuleFor(x => x.Cause)
                .NotEmpty().WithMessage("Causa é obrigatório");
        }
    }
}
