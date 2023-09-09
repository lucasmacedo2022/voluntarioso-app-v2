using Domain.Entities;
using FluentValidation;

namespace Application.Validation
{
	public class ProjectValidation : AbstractValidator<Project>
	{
		public ProjectValidation()
		{
			ValidateName();
			ValidateGoal();
			ValidateCategory();
			ValidateExpertise();
			ValidateInfrastructure();
		}

		private void ValidateName()
		{
			RuleFor(x => x.Name)
				.NotEmpty().WithMessage("Nome é obrigatório");
		}

		private void ValidateGoal()
		{
			RuleFor(x => x.Goal)
				.NotEmpty().WithMessage("Objetivo é obrigatório");
		}

		private void ValidateCategory()
		{
			RuleFor(x => x.Category)
				.NotEmpty().WithMessage("Categoria é obrigatório");
		}

		private void ValidateExpertise()
		{
			RuleFor(x => x.Expertise)
				.NotEmpty().WithMessage("Expertise é obrigatório");
		}

		private void ValidateInfrastructure()
		{
			RuleFor(x => x.Infrastructure)
				.NotEmpty().WithMessage("Infraestrutura é obrigatório");
		}
	}
}
