using Domain.Entities;
using FluentValidation;

namespace Application.Validation
{
	public class VolunteerValidation : AbstractValidator<Volunteer>
	{
		public VolunteerValidation()
		{
			ValidaEmail();
			ValidaSenha();
			ValidaNome();
			ValidaCPF();
			ValidaDataNascimento();
		}

		private void ValidaEmail()
		{
			RuleFor(x => x.VolunEmail)
				.NotEmpty().WithMessage("Email é obrigatório");
		}

		private void ValidaSenha()
		{
			RuleFor(x => x.VolunEmail)
				.NotEmpty().WithMessage("Senha é obrigatório");
		}

		private void ValidaNome()
		{
			RuleFor(x => x.VolunEmail)
				.NotEmpty().WithMessage("Nome é obrigatório");
		}

		private void ValidaCPF()
		{
			RuleFor(x => x.VolunEmail)
				.NotEmpty().WithMessage("CPF é obrigatório");
		}

		private void ValidaDataNascimento()
		{
			RuleFor(x => x.VolunEmail)
				.NotEmpty().WithMessage("Data de Nascimento é obrigatório");
		}
	}
}
